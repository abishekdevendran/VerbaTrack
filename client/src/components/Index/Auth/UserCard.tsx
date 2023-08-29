import LogoutButton from '@/components/Index/Auth/LogoutButton';
import { buttonVariants } from '@/components/ui/button';
import isLoggedIn from '@/lib/fetchers/user/isLoggedIn';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UserCard = async () => {
	const loginStatus = await isLoggedIn();
	if (loginStatus.message === 'Login failed') {
		return null;
	}
	return (
		<>
			<Image
				className="rounded-full"
				src={loginStatus.user.image ?? ''}
				alt="User Avatar"
				width={50}
				height={50}
			/>
			<div>
				<Link
					className={buttonVariants({ variant: 'secondary' })}
					href={'/dashboard'}>
					Dashboard
				</Link>
				<LogoutButton />
			</div>
		</>
	);
};

export default UserCard;
