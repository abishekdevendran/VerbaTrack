import isLoggedIn from '@/lib/fetchers/user';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {
	try {
		await isLoggedIn();
		return <div>Dashboard</div>;
	} catch (err) {
		redirect('/');
	}
};

export default Dashboard;
