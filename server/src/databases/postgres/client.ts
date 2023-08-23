import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const pool = postgres(process.env.POSTGRES_URL ?? '');

export default pool;