import GithubButton from '@/components/Index/Auth/GithubButton';
import GoogleButton from '@/components/Index/Auth/GoogleButton';
import UserCard from '@/components/Index/Auth/UserCard';
import isLoggedIn from '@/lib/fetchers/user/isLoggedIn';

const Github = async () => {
	const loginStatus = await isLoggedIn();
	if (loginStatus.message === 'Login failed') {
		return (
			<>
				<GoogleButton />
				<GithubButton />
			</>
		);
	} else {
		return <UserCard />;
	}
};

export default Github;
