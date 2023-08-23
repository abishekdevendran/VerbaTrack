import { Session } from 'express-session';

declare module 'express-session' {
	interface Session {
		passport:
			| {
					user: {
						id: number;
						fullName: string;
						email: string | null | undefined;
						image: string | null | undefined;
						phone: string | null | undefined;
					};
			  }
			| undefined;
	}
}

declare global {
	namespace Express {
		interface User {
			id: number;
			fullName: string;
			email: string | null | undefined;
			image: string | null | undefined;
			phone: string | null | undefined;
		}
	}
}
