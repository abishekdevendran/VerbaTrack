'use client';

import getUser from '@/lib/fetchers/user';
import userAtom from '@/lib/store/user';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

const UserProvider = () => {
	const [user, setUser] = useAtom(userAtom);
	const { data: userData, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			setUser({
				user: undefined,
				isLoading: true,
			});
			try {
				const response = await getUser();
				return response.user;
			} catch (e) {
				return null;
			}
		},
		onSuccess: (data) => {
			setUser({
				user: data ?? undefined,
				isLoading: false,
			});
		},
	});
	return null;
};

export default UserProvider;
