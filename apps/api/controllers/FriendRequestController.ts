import { Request, Response } from 'express';
import { db } from '../models/connection';
import { UserController } from './UserController';
import { Status, friendRequest, validateStatus } from '../models/schema';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';
import { FriendController } from './FriendController';

// Controlador para manejar las operaciones relacionadas con las solicitudes de amistad
export class FriendRequestController {
  // Método para enviar una solicitud de amistad
  static async sendFriendRequest(req: Request, res: Response): Promise<void> {
    try {
      // Obtiene los datos del cuerpo de la solicitud
      const { senderId, email } = req.body;

      const [userRequestExist] = await UserController.userExists(email);
      if (!userRequestExist)
        res.status(404).json({ error: 'No existe ese usuario' });
      // Crea una nueva solicitud de amistad utilizando el modelo
      const newRequest = await db.insert(friendRequest).values({
        id: nanoid(),
        senderId,
        receiverId: userRequestExist.id,
        status: Status.SEND,
      });

      // Envía la respuesta con la nueva solicitud creada
      res.status(201).json(newRequest);
    } catch (error) {
      // Maneja los errores
      res.status(500).json({ error: 'Error al enviar solicitud de amistad' });
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
      const friendRequests = await db
        .select()
        .from(friendRequest)
        .where(eq(friendRequest.receiverId, userId));

      // Envía la respuesta con las solicitudes encontradas
      res.status(200).json(friendRequests);
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
        .from(friendRequest)
        .where(eq(friendRequest.id, requestId));

      // Verifica si la solicitud existe
      if (!request) {
        res.status(404).json({ error: 'Solicitud de amistad no encontrada' });
        return;
      }

      // Actualiza el estado de la solicitud
      const requestUpdated = await db
        .update(friendRequest)
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
