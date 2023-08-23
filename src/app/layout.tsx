import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Navbar from '@/components/Index/Navbar';
import dynamic from 'next/dynamic';
import { Provider } from 'jotai';
import JotaiProvider from '@/lib/store/_jotai/Provider';
import { Toaster } from 'react-hot-toast';

const ThemeProvider = dynamic(
	() => import('@/components/Index/ThemeProvider'),
	{
		ssr: false
	}
);

const poppins = Poppins({
	display: 'swap',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	preload: true,
	variable: '--font-poppins',
	subsets: ['latin-ext']
});

export const metadata: Metadata = {
	title: 'VerbaTrack | Your Ultimate Habit Tracking Companion',
	description:
		'Elevate your progress with VerbaTrack, the cutting-edge habit tracking app designed to help you commit, track, and achieve your goals. From increasing reps to boosting reading habits, VerbaTrack empowers you to set intentions and monitor progress effortlessly. Join us on a journey of growth and accomplishment'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${poppins.className}`}>
				<JotaiProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<Navbar />
						{children}
					</ThemeProvider>
					<Toaster />
				</JotaiProvider>
			</body>
		</html>
	);
}
