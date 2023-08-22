'use client';

import { ThemeToggler } from '@/components/Index/ThemeToggler';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
	const [isNavVisible, setIsNavVisible] = useState(true);
	useEffect(() => {
		let prevScrollPos = window.scrollY;
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;
			const visible = prevScrollPos > currentScrollPos;
			setIsNavVisible(visible);
			prevScrollPos = currentScrollPos;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav
			className={`nav fixed z-50 flex h-16 w-[calc(100%-var(--removed-body-scroll-bar-size,0px))] flex-wrap items-center justify-between border-gray-100 top-0 transition-all duration-300 ease-in-out ${
				isNavVisible ? '' : 'translate-y-[-100%]'
			}`}>
			<div className="container flex items-center justify-between w-full">
				<span className="text-3xl font-extrabold">VerbaTrack</span>
				<ThemeToggler />
			</div>
		</nav>
	);
};

export default Navbar;