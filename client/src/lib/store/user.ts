import { atom } from 'jotai';

const userAtom = atom<{ user: User | undefined; isLoading: boolean }>({
	user: undefined,
	isLoading: true,
});
userAtom.debugLabel = 'userAtom';

export default userAtom;
