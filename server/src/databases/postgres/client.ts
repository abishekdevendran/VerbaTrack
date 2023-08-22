import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const pool = postgres(process.env.POSTGRES_URL ?? '');
const db = drizzle(pool);

export default db;