import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './models/schema';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  url: process.env.DATABASE_URL as string,
  authToken: process.env.DATABASE_URL_AUTH_TOKEN,
});
export const db = drizzle(client, { schema, logger: true });
