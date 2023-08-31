'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useUser from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { SiGoogle } from '@icons-pack/react-simple-icons';
import { Github, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const firstLetterExtractor = (name: string) => {
	return name
		.split(' ')
		.map((n) => n[0])
		.join('');
};

const LoginOrWelcome = () => {
	const { isLoggedIn, isLoading, user, logout } = useUser();
	if (isLoading) return <Loader2 className="animate-spin" />;
	if (isLoggedIn) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="transform cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
						<AvatarImage src={user?.avatar} />
						<AvatarFallback>
							{firstLetterExtractor(user?.name ?? user?.username ?? 'A B')}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={logout} className="cursor-pointer">
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}
	return (
		<div className="flex items-center justify-center gap-2">
			<Link
				href={`${process.env.NEXT_PUBLIC_API_URL}/auth/github`}
				className={cn(
					buttonVariants({ variant: 'outline' }),
					'm-0 aspect-square p-1',
				)}
			>
				<Github />
			</Link>
			<Link
				href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
				className={cn(
					buttonVariants({ variant: 'outline' }),
					'm-0 aspect-square p-1',
				)}
			>
				<SiGoogle />
			</Link>
		</div>
	);
};

export default LoginOrWelcome;
