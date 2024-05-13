import { Request, Response } from 'express';
import { db, friendRequests, notifications } from '@stood/database';
import { eq } from 'drizzle-orm';
import { AuthenticatedRequest } from '../app';

export class NotificationController {
  static async getAllNotifications(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    console.log('uuuuuu');
    try {
      const userId = req.userId;
      const userNotifications = await db
        .select()
        .from(notifications)
        .where(eq(notifications.userId, userId as string))
        .fullJoin(
          friendRequests,
          eq(notifications.friendRequestsId, friendRequests.id)
        );

      console.log(userNotifications, 'userNoti');
      res.status(200).json(userNotifications);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las notificaciones' });
    }
  }
}
