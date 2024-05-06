import { Request, Response } from 'express';
import { db } from '../models/connection';
import { friends } from '../models/schema';
import { nanoid } from 'nanoid';
import { and, eq } from 'drizzle-orm';
import { UserController } from './UserController';

export class FriendController {
  // Método para obtener todos los amigos de un usuario
  static async getAllFriends(req: Request, res: Response): Promise<void> {
    try {
      // Obtiene el ID del usuario de la solicitud
      const userId = req.params.userId;

      // Busca todos los amigos del usuario en la base de datos
      const allFriends = await db
        .select()
        .from(friends)
        .where(eq(friends.userId, userId));

      // Envía la respuesta con los amigos encontrados
      res.status(200).json(allFriends);
    } catch (error) {
      // Maneja los errores
      res.status(500).json({ error: 'Error al obtener amigos' });
    }
  }
  static async friendExists(
    userId: string,
    friendId: string
  ): Promise<boolean> {
    // Busca un amigo con el ID de usuario y el ID de amigo proporcionados
    const isFriendOnDB = await db
      .select()
      .from(friends)
      .where(and(eq(friends.userId, userId), eq(friends.friendId, friendId)));

    return !!isFriendOnDB; // Devuelve true si el amigo existe, de lo contrario false
  }

  // Método para agregar un nuevo amigo
  static async addFriend(req: Request, res: Response): Promise<void> {
    try {
      // Obtiene los datos del cuerpo de la solicitud
      const { userId, friendId, email } = req.body;

      //Revisa si existe el usuario al que tratar de añadir
      const [userPretendingFriend] = await UserController.userExists(email);
      //Si no existe devuelve un 404
      if (!userPretendingFriend)
        res
          .status(404)
          .json({ error: 'No existe este usuario en la base de datos' });

      //Revisa si ya lo tienes como amigo
      const isFriendOnDB = await FriendController.friendExists(
        userId,
        userPretendingFriend.id
      );

      if (isFriendOnDB) res.status(409).json({ error: 'Ya existe este amigo' });
      // Crea un nuevo amigo utilizando el modelo
      const newFriend = await db
        .insert(friends)
        .values({ id: nanoid(), userId, friendId });

      // Envía la respuesta con el nuevo amigo creado
      res.status(201).json(newFriend);
    } catch (error) {
      // Maneja los errores
      res.status(500).json({ error: 'Error al agregar amigo' });
    }
  }

  // Método para eliminar un amigo
  static async deleteFriend(req: Request, res: Response): Promise<void> {
    try {
      // Obtiene el ID del amigo a eliminar
      const { userId, friendId } = req.body;
      // Elimina el amigo de la base de datos
      const deletedId = await db
        .delete(friends)
        .where(and(eq(friends.userId, userId), eq(friends.friendId, friendId)))
        .returning({ friendDeletedId: friends.friendId });
      // Envía la respuesta
      res.status(200).json(deletedId);
    } catch (error) {
      // Maneja los errores
      res.status(500).json({ error: 'Error al eliminar amigo' });
    }
  }
}
