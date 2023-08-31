export default async function getUser() {
	const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
		credentials: 'include',
	});
	if (resp.status === 401) throw new Error('Unauthorized');
	return resp.json();
}

export async function Logout() {
	const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`,{
		credentials: 'include',
	});
	if (resp.status === 401) throw new Error('Unauthorized');
}
