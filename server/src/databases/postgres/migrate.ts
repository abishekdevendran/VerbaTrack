import { migrate } from 'drizzle-orm/postgres-js/migrator';
import db from './client';

// this will automatically run needed migrations on the database
async function main() {
	console.log('🟢 Beginning Migrations...');
	try {
		await migrate(db, { migrationsFolder: 'drizzle' });
		console.log('🟢 Migrations Completed Successfully');
	} catch (err) {
		if (err instanceof Error) {
			console.log('🔴 Migrations Failed: ', err.message);
		} else {
			console.log('🔴 Migrations Failed');
		}
	} finally {
		process.exit(0);
	}
}

main();
