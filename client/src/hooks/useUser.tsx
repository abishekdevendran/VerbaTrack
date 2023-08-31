import {Logout} from '@/lib/fetchers/user';
import userAtom from '@/lib/store/user';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const isLoggedInAtom = atom((get) => !!get(userAtom)?.user);

function useUser() {
	const [user, setUser] = useAtom(userAtom);
	const isLoggedIn = useAtomValue(isLoggedInAtom);
	const logout = async () => {
		setUser({
			user: user.user,
			isLoading: true,
		});
		await Logout();
		setUser({
      user: undefined,
      isLoading: false,
    });
	};
	return {
		user:user.user,
    isLoading:user.isLoading,
		setUser,
		isLoggedIn,
		logout,
	};
}

export default useUser;
