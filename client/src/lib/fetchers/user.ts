export default async function getUser() {
	const resp = await fetch(`/backend/user`, {
		credentials: 'include',
	});
	if (resp.status === 401) throw new Error('Unauthorized');
	return resp.json();
}

export async function Logout() {
	const resp = await fetch(`/backend/user/logout`, {
		credentials: 'include',
	});
	if (resp.status === 401) throw new Error('Unauthorized');
}
