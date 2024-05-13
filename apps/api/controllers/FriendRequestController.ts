import { Request, Response } from 'express';
import { db, friends, messages } from '@stood/database';
import { UserController } from './UserController';
import { friendRequests, notifications } from '@stood/database';
import { nanoid } from 'nanoid';
import { eq, or, sql } from 'drizzle-orm';
import { FriendController } from './FriendController';
import { replaceRequestBody } from '../utils/replaceRequestBody';
import { AuthenticatedRequest, pusher } from '../app';

// Controlador para manejar las operaciones relacionadas con las solicitudes de amistad
export class FriendRequestController {
  // Método para enviar una solicitud de amistad
  static async sendFriendRequest(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      // Obtiene los datos del cuerpo de la solicitud
      console.log(req.body);
      const userId = req.userId as string;
      const { email } = req.body;

      console.log(userId, 'sender');
      const [userSender] = await UserController.userExistsById(userId);
      if (!userSender) {
        res
          .status(404)
          .json({ error: 'No existe el usuario que envia la solicitud ' });
        return;
      }

      const [userRequestExist] = await UserController.userExists(email);

      if (!userRequestExist) {
        res.status(404).json({ error: 'No existe ese usuario' });
        return;
      }

      const [requestExistForSender] = await db
        .select()
        .from(friendRequests)
        .where(
          or(
            eq(friendRequests.senderId, userId),
            eq(friendRequests.receiverId, userRequestExist.id)
          )
        );
      const [requestExistForReceiver] = await db
        .select()
        .from(friendRequests)
        .where(
          or(
            eq(friendRequests.receiverId, userId),
            eq(friendRequests.senderId, userRequestExist.id)
          )
        );
      if (requestExistForSender || requestExistForReceiver) {
        res.status(404).json({
          error: 'Ya existe una solicitud de alguno de los dos usuarios',
        });
        return;
      }
      // Crea una nueva solicitud de amistad utilizando el modelo
      const [newRequest] = await db
        .insert(friendRequests)
        .values({
          id: nanoid(),
          senderId: userId,
          receiverId: userRequestExist.id,
          status: 'SENDED',
        })
        .onConflictDoNothing()
        .returning();

      if (!newRequest) {
        res.status(404).json({ error: 'No se pudo crear el la solicitud' });
        return;
      }
      console.log(newRequest, 'newRequest');

      const [newNotification] = await db
        .insert(notifications)
        .values({
          id: nanoid(),
          createdAt: sql<string>`(CURRENT_TIMESTAMP)`,
          friendRequestsId: newRequest.id,
          message: `${userSender.name} te envió una solicitud de amistad`,
          userId: userRequestExist.id,
        })
        .onConflictDoNothing()
        .returning();
      if (!newNotification) {
        res
          .status(404)
          .json({ error: 'Ya existe una solicitud de amistad a este usuario' });
        return;
      }
      // Envía la respuesta con la nueva solicitud creada
      res.status(201).json({
        message: 'Se envió la solicitud de amistad!',
        newRequest,
      });

      await pusher.trigger(`user-${newNotification.userId}`, 'notification', {
        message: newNotification.message,
      });
    } catch (error) {
      // Maneja los errores
      res
        .status(500)
        .json({ error: 'Error al enviar solicitud de amistad' + error });
    }
  }

  // Método para obtener todas las solicitudes de amistad de un usuario
  static async getAllFriendRequests(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      // Obtiene el ID del usuario de la solicitud
      const userId = req.userId;
      console.log(userId, 'userrrrrrr');

      // Busca todas las solicitudes de amistad del usuario en la base de datos
      const friendRequest = await db
        .select()
        .from(friendRequests)
        .where(eq(friendRequests.receiverId, userId as string));

      // Envía la respuesta con las solicitudes encontradas
      res.status(200).json(friendRequest);
    } catch (error) {
      // Maneja los errores
      res
        .status(500)
        .json({ error: 'Error al obtener solicitudes de amistad' });
    }
  }

  // Método para aceptar o rechazar una solicitud de amistad
  static async respondToFriendRequest(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      console.log('tttttt1');
      const userId = req.userId as string;
      // Obtiene el ID de la solicitud de amistad y la acción del cuerpo de la solicitud
      const { requestId, action } = req.body;
      console.log(requestId);
      console.log(action);
      // Verifica si la acción es válida

      console.log('tttttt2');

      // Busca la solicitud de amistad en la base de datos
      const [request] = await db
        .select()
        .from(friendRequests)
        .where(eq(friendRequests.id, requestId));
      console.log('tttttt3');

      // Verifica si la solicitud existe
      if (!request) {
        res.status(404).json({ error: 'Solicitud de amistad no encontrada' });
        return;
      }
      console.log('tttttt4');

      const bodySenderId = {
        userId: request.senderId,
        friendId: request.receiverId,
      };
      const bodyReceiverId = {
        userId: request.receiverId,
        friendId: request.senderId,
      };
      console.log(bodyReceiverId);

      const friendInserts = await db.batch([
        db
          .insert(friends)
          .values({
            id: nanoid(),
            userId: request.senderId,
            friendId: request.receiverId,
          })
          .onConflictDoNothing()
          .returning(),
        db
          .insert(friends)
          .values({
            id: nanoid(),
            userId: request.receiverId,
            friendId: request.senderId,
          })
          .onConflictDoNothing()
          .returning(),
      ]);
      console.log(friendInserts, 'friendInserts');
      // const newBodyUserSenderId = replaceRequestBody(req, bodySenderId);
      // const newBodyUserFriendId = replaceRequestBody(req, bodyReceiverId);
      // //Se añade como amigo al que envia
      // await FriendController.addFriend(newBodyUserSenderId, res);
      // //Se añade como amigo al que al que recibe
      // await FriendController.addFriend(newBodyUserFriendId, res);

      // Actualiza el estado de la solicitud
      const [requestUpdated] = await db
        .update(friendRequests)
        .set({ status: action })
        .returning();
      console.log(requestUpdated, 'updatedddd');
      // Envía la respuesta con el estado actualizado de la solicitud
      console.log('ttttttend');

      res.status(200).json({ message: 'Haz aceptado la solicitud' });
    } catch (error) {
      // Maneja los errores
      res
        .status(500)
        .json({ error: 'Error al responder solicitud de amistad' });
    }
  }
}
