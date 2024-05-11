import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

export enum Status {
  SEND = 'SENDED',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export const users = sqliteTable('users', {
  id: text('id').primaryKey().unique(),
  name: text('name'),
  email: text('email').unique(),
  picture: text('picture'),
  createdAt: text('createdAt').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updatedAt'),
});
export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export const chats = sqliteTable('chats', {
  id: text('id').primaryKey(),
  chatName: text('chatName'),
});
export type SelectChat = InferSelectModel<typeof chats>;
export type InsertChat = InferInsertModel<typeof chats>;

export const userChats = sqliteTable('userChats', {
  id: text('id').primaryKey(),
  userId: text('userId').references(() => users.id),
  chatId: text('chatId').references(() => chats.id),
});
export type SelectUserChat = InferSelectModel<typeof userChats>;
export type InsertUserChat = InferInsertModel<typeof userChats>;

export const friends = sqliteTable('friends', {
  id: text('id').primaryKey(),
  userId: text('userId').references(() => users.id),
  friendId: text('friendId').references(() => users.id),
});
export type SelectFriend = InferSelectModel<typeof friends>;
export type InsertFriend = InferInsertModel<typeof friends>;

export const friendRequests = sqliteTable('friendRequests', {
  id: text('id').primaryKey(),
  senderId: text('senderId').references(() => users.id),
  receiverId: text('receiverId')
    .unique()
    .references(() => users.id),
  status: text('status').$type<Status>(),
});
export type SelectFriendRequest = InferSelectModel<typeof friendRequests>;
export type InsertFriendRequest = InferInsertModel<typeof friendRequests>;

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  content: text('content'),
  createdAt: text('createdAt'),
  chatId: text('chatId')
    .unique()
    .references(() => chats.id),
  senderId: text('senderId')
    .unique()
    .references(() => users.id),
});
export type SelectMessage = InferSelectModel<typeof messages>;
export type InsertMessage = InferInsertModel<typeof messages>;

export const notifications = sqliteTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('userId').references(() => users.id),
  message: text('message'),
  createdAt: text('createdAt'),
  friendRequestsId: text('friendRequestsId')
    .unique()
    .references(() => friendRequests.id),
});
export type SelectNotification = InferSelectModel<typeof notifications>;
export type InsertNotification = InferInsertModel<typeof notifications>;
