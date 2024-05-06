import { Request, Response } from 'express';
import { db } from '../models/connection';
import { User, users } from '../models/schema';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';

export class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      // Busca todos los usuarios en la base de datos
      const allUsers = await db.select().from(users);

      // Envía la respuesta con los usuarios encontrados
      res.status(200).json(allUsers);
    } catch (error) {
      // Maneja los errores
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      // Obtiene los datos del cuerpo de la solicitud
      const { name, email, accessToken, refreshToken } = req.body;
      // Crea un nuevo usuario utilizando el modelo
      const newUser = db
        .insert(users)
        .values({ id: nanoid(), name, email, accessToken, refreshToken });

      // Envía la respuesta con el nuevo usuario creado
      res.status(201).json(newUser);
    } catch (error) {
      // Maneja los errores
      res.status(500).json({ error: 'Error al crear usuario' });
    }
  }

  static async userExists(email: string): Promise<User[]> {
    // Busca un usuario con el correo electrónico proporcionado
    const isUserOnDB = await db
      .select()
      .from(users)
      .where(eq(users.email, email as string));
    return isUserOnDB; // Devuelve un array con el usuario existe, de lo contrario manda un array vació
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      // Obtiene el ID del usuario y los nuevos datos del cuerpo de la solicitud
      const { id } = req.params;

      const { name, email, accessToken, refreshToken } = req.body;
      // Verifica si el usuario existe
      const userExists = await UserController.userExists(email);

      if (userExists.length < 1) {
        res.status(404).json({ error: 'El usuario no existe' });
        return;
      }
      // Actualiza los datos del usuario\
      await db
        .update(users)
        .set({
          email: email,
          name: name,
          accessToken: accessToken,
          refreshToken: refreshToken,
          updatedAt: new Date().toLocaleString('es-MX', { timeZone: 'UTC' }),
        })
        .where(eq(users.id, id as string));

      // Envía la respuesta con el usuario actualizado
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      // Maneja los errores
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  }
}
