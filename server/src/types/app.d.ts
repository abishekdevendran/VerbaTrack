/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import('@/lib/lucia').Auth;
	type DatabaseUserAttributes = {
		github_username: string | null;
		username: string | null;
		email: string | null;
		name: string | null;
	};
	type DatabaseSessionAttributes = {};
}
