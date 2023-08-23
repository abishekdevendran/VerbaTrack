import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const GithubButton = () => {
	return (
		<Link
			className={cn(
				buttonVariants({ variant: 'default' }),
				'rounded-full aspect-square'
			)}
			href={`${process.env.NEXT_PUBLIC_API_URL}/auth/github`}>
			Github
		</Link>
	);
};

export default GithubButton;
