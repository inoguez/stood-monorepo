import { Request, Response } from 'express';
import { friendRequests, notifications } from '../models/schema';
import { db } from '../models/connection';
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
        .select({
          id: notifications.id,
          userId: notifications.userId,
          message: notifications.message,
          createdAt: notifications.createdAt,
          friendRequestsId: {
            id: friendRequests.id,
            senderId: friendRequests.senderId,
            receiverId: friendRequests.receiverId,
            status: friendRequests.status,
          },
        })
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
