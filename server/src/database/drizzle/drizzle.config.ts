import dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config();

export default {
	schema: './schema/index.ts',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL ?? '',
	},
} satisfies Config;
