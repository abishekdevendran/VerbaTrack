
// async function getBgImg(): Promise<{
// 	href: {
// 		[resolution: string]: string;
// 	};
// } | null> {
// 	try {
// 		const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/bgImg`);
// 		url.searchParams.append('time', 'early');
// 		url.searchParams.append('working', 'true');
// 		const bgSource = await fetch(url, {
// 			method: 'GET',
// 		}).then((res) => res.json());
// 		console.log(bgSource);
// 		return bgSource;
// 	} catch (e) {
// 		console.log(e);
// 		return null;
// 	}
// }

export default async function Home() {
	// const bgSource = await getBgImg();
	// console.log(bgSource);
	return (
		<main
			className={`flex h-full min-h-screen w-full flex-col items-center justify-between transition-all duration-300 ease-in-out`}
			/* style={{
				backgroundImage: `url(${bgSource?.href?.full})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}} */
		>
		</main>
	);
}
