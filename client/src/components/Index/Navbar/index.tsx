'use client';

import LoginOrWelcome from '@/components/Index/Navbar/LoginOrWelcome';
import Navigation from '@/components/Index/Navbar/Navigation';
import ThemeToggler from '@/components/Index/ThemeToggler';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Navbar = ({ className, ...props }: { className?: string }) => {
	const [isNavVisible, setIsNavVisible] = useState(true);
	const [isPageTop, setIsPageTop] = useState(true);

	// update nav based on scroll direction
	useEffect(() => {
		let prevScrollPos = window.scrollY;
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;
			const visible = prevScrollPos > currentScrollPos;
			setIsNavVisible(visible);
			prevScrollPos = currentScrollPos;
			if (currentScrollPos <= 50) {
				if (!isPageTop) setIsPageTop(true);
			} else {
				if (isPageTop) setIsPageTop(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isPageTop]);

	return (
		<nav
			className={cn(
				`nav fixed top-0 z-50 flex h-24 w-[calc(100%-var(--removed-body-scroll-bar-size,0px))] flex-wrap items-center justify-between ${
					isNavVisible ? '' : 'translate-y-[-100%]'
				} transition-[transform,background] duration-300 ease-in-out ${
					isPageTop
						? ' bg-opacity-0 bg-clip-padding backdrop-blur-sm backdrop-filter '
						: ' bg-opacity-75 '
				}`,
				className,
			)}
			{...props}
		>
			<div className="container flex items-center justify-between px-4">
				<div className="flex items-center justify-center gap-2">
					<div className="aspect-square h-full">
						<Image
							src="/icons/logo.svg"
							alt="logo"
							width={50}
							height={50}
							className="aspect-square h-full transform cursor-pointer object-contain transition duration-300 ease-in-out"
						/>
					</div>
					<span className="font-quantify text-5xl">VerbaTrack</span>
				</div>
				<Navigation />
				<div className="flex items-center gap-2">
					<ThemeToggler />
					<LoginOrWelcome />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
