import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  users,
  chats,
  userChats,
  friends,
  friendRequests,
  messages,
  notifications,
} from '@stood/database';

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;
export type SelectChat = InferSelectModel<typeof chats>;
export type InsertChat = InferInsertModel<typeof chats>;
export type SelectUserChat = InferSelectModel<typeof userChats>;
export type InsertUserChat = InferInsertModel<typeof userChats>;
export type SelectFriend = InferSelectModel<typeof friends>;
export type InsertFriend = InferInsertModel<typeof friends>;
export type SelectFriendRequest = InferSelectModel<typeof friendRequests>;
export type InsertFriendRequest = InferInsertModel<typeof friendRequests>;
export type SelectMessage = InferSelectModel<typeof messages>;
export type InsertMessage = InferInsertModel<typeof messages>;
export type SelectNotification = InferSelectModel<typeof notifications>;
export type InsertNotification = InferInsertModel<typeof notifications>;
