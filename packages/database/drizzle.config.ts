import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();
export default defineConfig({
  schema: './models/schema.ts',
  out: './models/migrations',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_URL_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
  dialect: 'sqlite',
});
