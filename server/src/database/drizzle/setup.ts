import * as schema from '@/database/drizzle/schema';
import { config } from 'dotenv';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

config();

const connectionString = process.env.POSTGRES_URL || '';
export const queryClient = postgres(connectionString);
const db = drizzle(queryClient, { schema });

export default db;
