import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
export interface User {
  id: string;
  name: string | null;
  email: string | null;
  picture: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
export function validateStatus(status: any): boolean {
  // Verifica si el status está incluido en los miembros de la enumeración
  return Object.values(Status).includes(status);
}
export enum Status {
  SEND,
  ACCEPTED,
  DECLINED,
}
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  picture: text('picture'),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  createdAt: text('createdAt'),
  updatedAt: text('updatedAt'),
});

export const chats = sqliteTable('chats', {
  id: text('id').primaryKey(),
  chatName: text('chatName'),
});

export const userChats = sqliteTable('userChats', {
  id: text('id').primaryKey(),
  userId: text('userId').references(() => users.id),
  chatId: text('chatId').references(() => chats.id),
});

export const friends = sqliteTable('friends', {
  id: text('id').primaryKey(),
  userId: text('userId').references(() => users.id),
  friendId: text('friendId').references(() => users.id),
});

export const friendRequests = sqliteTable('friendRequests', {
  id: text('id').primaryKey(),
  senderId: text('senderId').references(() => users.id),
  receiverId: text('receiverId').references(() => users.id),
  status: text('status').$type<Status>(),
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  content: text('content'),
  timestamp: text('timestamp').references(() => users.id),
  chatId: text('chatId').references(() => chats.id),
  senderId: text('senderId').references(() => chats.id),
});
