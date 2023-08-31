/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
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
