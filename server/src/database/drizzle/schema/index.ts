import {
	boolean,
	date,
	integer,
	interval,
	pgEnum,
	pgTable,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';

export const user = pgTable('auth_user', {
	id: varchar('id', {
		length: 15, // change this when using custom user ids
	}).primaryKey(),
	// other user attributes
	github_username: text('github_username').unique(),
	username: text('username').unique(),
	name: text('name'),
	email: text('email').unique(),
	avatar: text('avatar'),
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

export const worktimeEnums = pgEnum('during', ['work', 'hobby', 'both']);
export const everyEnums = pgEnum('every', ['day', 'week', 'month', 'year']);
export const weekdaysEnums = pgEnum('weekdays', [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
]);

export const task = pgTable('user_task', {
	id: varchar('id', {
		length: 255,
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15,
	})
		.notNull()
		.references(() => user.id),
	name: text('name'),
	minDuration: integer('min_duration').default(0).notNull(),
	during: worktimeEnums('during').default('both').notNull(),
	from: date('from', {
		mode: 'date',
	}).default(new Date()),
	to: date('to', {
		mode: 'date',
	}).default(new Date()),
	every: interval('every').default('1 day'),
	createdAt: timestamp('created_at').default(new Date()).notNull(),
	updatedAt: timestamp('updated_at').default(new Date()).notNull(),
});

export const event = pgTable('user_event', {
	id: varchar('id', {
		length: 255,
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15,
	})
		.notNull()
		.references(() => user.id),
	name: text('name'),
	minDuration: integer('min_duration').default(0).notNull(),
	from: date('from', {
		mode: 'date',
	}).default(new Date()),
	to: date('to', {
		mode: 'date',
	}).default(new Date()),
	every: interval('every').default('1 day'),
	weekdays: weekdaysEnums('weekdays'),
	createdAt: timestamp('created_at').default(new Date()).notNull(),
	updatedAt: timestamp('updated_at').default(new Date()).notNull(),
});
