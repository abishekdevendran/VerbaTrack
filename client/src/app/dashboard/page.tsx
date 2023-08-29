import isLoggedIn from '@/lib/fetchers/user/isLoggedIn';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {
	const loginStatus = await isLoggedIn();
	if (loginStatus.message === 'Login failed') {
		return redirect('/');
	}
	return <div>Dashboard</div>;
};

export default Dashboard;
