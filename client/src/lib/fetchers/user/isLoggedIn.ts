import { cookies } from 'next/headers';

const isLoggedIn = async (): Promise<
	| {
			message: 'Login success';
			user: User;
	  }
	| {
			message: 'Login failed';
	  }
> => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/auth/isLoggedIn`,
		{
			credentials: 'include',
			cache: 'no-store',
			headers: {
				Cookie: cookies().toString(),
				'Content-Type': 'application/json'
			}
		}
	);
	const json = await res.json();
	return json;
};

export default isLoggedIn;
