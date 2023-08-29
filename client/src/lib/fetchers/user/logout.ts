const logout = async (): Promise<{
	message: 'Logout success';
}> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
		{
			method: 'GET',
			credentials: 'include',
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	return response.json();
};

export default logout;
