import { queryClient } from '@/database/drizzle/setup';
import redisClient from '@/database/redis';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { redis as redisAdapter } from '@lucia-auth/adapter-session-redis';
import { github, google } from '@lucia-auth/oauth/providers';
import { config } from 'dotenv';
import { lucia } from 'lucia';
import { express } from 'lucia/middleware';
import 'lucia/polyfill/node';

config();
const isProd: boolean = process.env.NODE_ENV === 'production';
console.log('isProd: ', isProd);

export const auth = lucia({
	env: isProd ? 'PROD' : 'DEV', // "PROD" if deployed to HTTPS
	middleware: express(),
	adapter: {
		user: postgresAdapter(queryClient, {
			user: 'auth_user',
			key: 'user_key',
			session: 'user_session',
		}),
		session: redisAdapter(redisClient),
	},
	getUserAttributes: (data) => {
		return {
			githubUsername: data.github_username,
			username: data.username,
			email: data.email,
			name: data.name,
		};
	},
	csrfProtection: true,
});

export type Auth = typeof auth;

export const githubAuth = github(auth, {
	clientId: process.env.GITHUB_CLIENT_ID ?? '',
	clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
});

export const googleAuth = google(auth, {
	clientId: process.env.GOOGLE_CLIENT_ID ?? '',
	clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
	redirectUri: 'http://localhost:5000/auth/google/callback' ?? '',
	scope: ['email', 'profile'],
});
