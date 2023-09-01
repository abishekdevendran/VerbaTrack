/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
