/** @type {import('next').NextConfig} */
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	register: true,
	swcMinify: true,
	cacheOnFrontEndNav: true,
});

const nextConfig = {
	images: {
		domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
	},
	// rewrite all requests to /backend/* to http://localhost:5000/*
	rewrites: async () => {
		return [
			{
				source: '/backend/:path*',
				destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
			},
		];
	},
	transpilePackages: ['jotai-devtools'],
	experimental: {
		swcPlugins: [
			['@swc-jotai/react-refresh', {}],
			['@swc-jotai/debug-label', {}],
		],
	},
};

export default withPWA(nextConfig);
