export default async function User() {
	const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`);
	if (resp.status === 401) throw new Error('Unauthorized');
}
