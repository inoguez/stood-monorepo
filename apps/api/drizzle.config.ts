import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();
export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_URL_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
} satisfies Config;
