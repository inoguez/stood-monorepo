import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';
export const users = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name'),
  email: text('email'),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});
