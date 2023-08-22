import {
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex
} from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

export const users = pgTable(
	'users',
	{
		id: serial('id').primaryKey(),
		fullName: text('fullName').notNull(),
		email: text('email').notNull(),
		emailVerified: timestamp('emailVerified', {
			mode: 'date'
		}),
		password: text('password'),
		phone: text('phone'),
		createdAt: timestamp('createdAt').defaultNow(),
		image: text('image')
	},
	(users) => ({
		emailIndex: uniqueIndex('emailIndex').on(users.email)
	})
);

export type User = InferModel<typeof users>;
