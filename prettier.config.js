/** @type {import("prettier").Config} */
const config = {
	arrowParens: 'always',
	bracketSpacing: true,
	endOfLine: 'lf',
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	plugins: [
		'@trivago/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],
	tailwindFunctions: ['clsx', 'cn'],
};

export default config;
