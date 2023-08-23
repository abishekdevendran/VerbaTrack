import pool from '@/databases/postgres/client';
import { User } from '@/databases/postgres/schema';
import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';
import * as schema from '@/databases/postgres/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

const db = drizzle(pool, {
	schema
});

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.isAuthenticated()) {
			return res.status(200).json({ message: 'Login success', user: req.user });
		}
		res.status(401).json({ message: 'Login failed' });
	} catch (err) {
		next(err);
	}
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
	try {
		req.logout((err) => {
			if (err) {
				throw err;
			}
		});
		res.status(200).json({ message: 'Logout success' });
	} catch (err) {
		next(err);
	}
};

// Callback's return value is accessible in req.user
const githubVerifyCallback = async (
	accessToken: any,
	refreshToken: any,
	profile: any,
	done: (
		err: Error | ZodError | null,
		profile?: User | null,
		options?: any
	) => void
) => {
	try {
		// check if user already exists in our db with the given githubId
		const existingUser = await db.query.users.findFirst({
			where: eq(schema.users.githubId, profile.id)
		});
		if (existingUser) {
			return done(null, existingUser);
		}
		const newUser = await db
			.insert(schema.users)
			.values({
				fullName: profile.displayName,
				email: profile.email ?? profile.emails[0].value,
				image: profile.photos[0].value,
				githubId: profile.id
			})
			.returning();
		done(null, newUser[0]);
	} catch (err) {
		done(err as Error, null);
	}
};

const localValidator = z.object({
	emailOrPhone: z
		.string()
		.email()
		.or(
			z
				.string()
				.length(10, 'Mobile Number must be 10 digits')
				.refine(
					(value) => parseInt(value).toString() === value,
					'Mobile Number must be a number'
				)
				.refine(
					(value) => parseInt(value[0]) > 6,
					'Cannot be a valid Indian number'
				)
		),
	password: z.string().min(8)
});

const localVerifyCallback = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { emailOrPhone: emailOrPhoneValidated, password: passwordValidated } =
			localValidator.parse(req.body);
		// check if emailOrPhone is email or phone
		const user = await db.query.users.findFirst({
			where: eq(
				emailOrPhoneValidated.includes('@')
					? schema.users.email
					: schema.users.phone,
				emailOrPhoneValidated
			)
		});
		if (!user) {
			throw new Error('User not found');
		}
		if (!user.password) {
			throw new Error('User registered with OAuth');
		}
		if (bcrypt.compareSync(passwordValidated, user.password)) {
			throw new Error('Incorrect password');
		}
		// manually establish the session
		const sessionUser = {
			id: user?.id,
			fullName: user?.fullName,
			email: user?.email,
			image: user?.image,
			phone: user?.phone
		};

		req.login(sessionUser, (err) => {
			if (err) {
				throw err;
			}
		});
		res.status(200).json({
			message: 'Login success',
			user: sessionUser
		});
	} catch (err) {
		next((err as Error).message);
	}
};

export { githubVerifyCallback, localVerifyCallback, isLoggedIn, logout };
