import { Request, Response } from 'express';
import { db } from '../models/connection';
import { User, users } from '../models/schema';
import { nanoid } from 'nanoid';
import { and, eq, like, ne, not } from 'drizzle-orm';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export class UserController {
  static async getUsersByTerm(req: Request, res: Response): Promise<void> {
    const accessToken = req.headers['authorization'];
    console.log(accessToken);
    console.log(process.env.JWT_SECRET);

    const { userId } = jwt.verify(
      accessToken as string,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    console.log(userId, 'decode');
    try {
      const searchTerm = req.query.searchTerm;
      console.log(searchTerm, 'aaaa');
      // Busca todos los usuarios en la base de datos

      const userByTerm = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          picture: users.picture,
        })
        .from(users)
        .where(
          and(
            ne(users.id, userId as string),
            like(users.email, `%${searchTerm}%`)
          )
        );
      console.log(userByTerm, 'data');
      // Envía la respuesta con los usuarios encontrados
      res.status(200).json(userByTerm);
    } catch (error) {
      // Maneja los errores
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }
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
      const { name, email, picture } = req.body;
      // Crea un nuevo usuario utilizando el modelo
      const user = {
        id: nanoid(),
        name,
        email,
        picture,
        createdAt: new Date().toLocaleString('es-MX', { timeZone: 'UTC' }),
        updatedAt: new Date().toLocaleString('es-MX', { timeZone: 'UTC' }),
      };
      console.log(user, 'object');
      const newUser = await db
        .insert(users)
        .values(user)
        .onConflictDoUpdate({
          target: users.email,
          set: {
            name: user.name,
            email: user.email,
            picture: user.picture,
            updatedAt: new Date().toLocaleString('es-MX', { timeZone: 'UTC' }),
          },
        });
      console.log(newUser, 'newUser');
      // Envía la respuesta con el nuevo usuario creado
      res.status(201).json(newUser);
    } catch (error) {
      // Maneja los errores
      console.log(error, 'error');
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
  static async userExistsById(id: string): Promise<User[]> {
    // Busca un usuario con el correo electrónico proporcionado

    console.log(id, 'iddd');
    const isUserOnDB = await db
      .select()
      .from(users)
      .where(eq(users.id, id as string));
    return isUserOnDB; // Devuelve un array con el usuario existe, de lo contrario manda un array vació
  }
}
