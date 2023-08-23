import GithubButton from '@/components/Index/Github/GithubButton';
import UserCard from '@/components/Index/Github/UserCard';
import isLoggedIn from '@/lib/fetchers/user/isLoggedIn';

const Github = async () => {
	const loginStatus = await isLoggedIn();
	if (loginStatus.message === 'Login failed') {
		return <GithubButton />;
	} else {
		return <UserCard />;
	}
};

export default Github;
