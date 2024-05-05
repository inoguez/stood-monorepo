import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

export const chats = sqliteTable('chats', {
  id: text('id').primaryKey(),
  chatName: text('chatName'),
});

export const userChats = sqliteTable('messages', {
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
  userId: text('senderId').references(() => users.id),
  friendId: text('receiverId').references(() => users.id),
  status: text('status'),
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  content: text('content'),
  timestamp: text('timestamp').references(() => users.id),
  chatId: text('chatId').references(() => chats.id),
  senderId: text('chatId').references(() => chats.id),
  status: text('status'),
});
