// TypeScript version of schema.js
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const interviews = pgTable('interviews', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  score: integer('score'),
  createdAt: timestamp('created_at').defaultNow(),
});
