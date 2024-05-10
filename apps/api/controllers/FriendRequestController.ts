import { Request, Response } from 'express';
import { db } from '../models/connection';
import { UserController } from './UserController';
import { Status, friendRequests, validateStatus } from '../models/schema';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';
import { FriendController } from './FriendController';
import { replaceRequestBody } from '../utils/replaceRequestBody';

// Controlador para manejar las operaciones relacionadas con las solicitudes de amistad
export class FriendRequestController {
  // Método para enviar una solicitud de amistad
  static async sendFriendRequest(req: Request, res: Response): Promise<void> {
    try {
      // Obtiene los datos del cuerpo de la solicitud
      console.log(req.body);
      const { senderId, email } = req.body;
      console.log(senderId, 'sender');
      const [userRequestExist] = await UserController.userExists(email);
      if (!userRequestExist)
        res.status(404).json({ error: 'No existe ese usuario' });
      // Crea una nueva solicitud de amistad utilizando el modelo
      const [newRequest] = await db
        .insert(friendRequests)
        .values({
          id: nanoid(),
          senderId,
          receiverId: userRequestExist.id,
          status: Status.SEND,
        })
        .onConflictDoNothing({ target: friendRequests.receiverId })
        .returning();
      console.log(newRequest, 'new');
      // Envía la respuesta con la nueva solicitud creada
      res
        .status(201)
        .json({
          message: newRequest
            ? 'Se envió la solicitud de amistad!'
            : 'Ya existe una solicitud pendiente',
          newRequest,
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
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      // Obtiene el ID del usuario de la solicitud
      const userId = req.params.userId;

      // Busca todas las solicitudes de amistad del usuario en la base de datos
      const friendRequest = await db
        .select()
        .from(friendRequests)
        .where(eq(friendRequests.receiverId, userId));

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
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      // Obtiene el ID de la solicitud de amistad y la acción del cuerpo de la solicitud
      const { requestId, action } = req.body;

      // Verifica si la acción es válida
      if (validateStatus(action)) {
        res.status(400).json({ error: 'Acción inválida' });
        return;
      }

      // Busca la solicitud de amistad en la base de datos
      const [request] = await db
        .select()
        .from(friendRequests)
        .where(eq(friendRequests.id, requestId));

      // Verifica si la solicitud existe
      if (!request) {
        res.status(404).json({ error: 'Solicitud de amistad no encontrada' });
        return;
      }

      const [senderId] = await UserController.userExistsById(
        request.senderId as string
      );
      const [ReceiverId] = await UserController.userExistsById(
        request.receiverId as string
      );

      const bodySenderId = {
        userId: request.senderId,
        friendId: request.receiverId,
        email: senderId.email,
      };
      const bodyReceiverId = {
        userId: request.receiverId,
        friendId: request.senderId,
        email: ReceiverId.id,
      };
      const newBodyUserSenderId = replaceRequestBody(req, bodySenderId);
      const newBodyUserFriendId = replaceRequestBody(req, bodyReceiverId);
      //Se añade como amigo al que envia
      await FriendController.addFriend(newBodyUserSenderId, res);
      //Se añade como amigo al que al que recibe
      await FriendController.addFriend(newBodyUserFriendId, res);

      // Actualiza el estado de la solicitud
      const requestUpdated = await db
        .update(friendRequests)
        .set({ status: action as Status });
      // Envía la respuesta con el estado actualizado de la solicitud
      res.status(200).json(requestUpdated);
    } catch (error) {
      // Maneja los errores
      res
        .status(500)
        .json({ error: 'Error al responder solicitud de amistad' });
    }
  }
}
