'use client';
import userAtom from '@/lib/store/user';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

const UserInit = () => {
	const userSetter = useSetAtom(userAtom);
	useEffect(() => {
		const loginFetcher = async () => {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/isLoggedIn`,
				{
					credentials: 'include',
					cache: 'no-store'
				}
			);
			const json = await res.json();
			console.log(json);
			return json;
		};
		loginFetcher().then((data) => {
			if (data.message !== 'Login failed') {
				userSetter(data);
			}
		});
	}, [userSetter]);
	return null;
};

export default UserInit;
