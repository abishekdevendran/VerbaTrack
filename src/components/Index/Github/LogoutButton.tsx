'use client';
import { Button } from '@/components/ui/button';
import logout from '@/lib/fetchers/user/logout';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const LogoutButton = () => {
	const router = useRouter();
	const serverLogout = async () => {
		try {
			const res = await toast.promise(logout(), {
				loading: 'Logging out...',
				success: 'Logout success',
				error: 'Logout failed'
			});
			if (res.message === 'Logout success') {
				router.refresh();
			}
		} catch (err) {
			console.error(err);
		}
	};
	return <Button onClick={serverLogout}>Logout</Button>;
};

export default LogoutButton;
