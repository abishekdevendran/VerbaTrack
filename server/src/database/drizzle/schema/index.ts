import { bigint, boolean, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('auth_user', {
	id: varchar('id', {
		length: 15, // change this when using custom user ids
	}).primaryKey(),
	// other user attributes
	github_username: text('github_username').unique(),
	username: text('username').unique(),
	name: text('name'),
	email: text('email').unique(),
});

export const key = pgTable('user_key', {
	id: varchar('id', {
		length: 255,
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15,
	})
		.notNull()
		.references(() => user.id),
	hashedPassword: varchar('hashed_password', {
		length: 255,
	}),
});
