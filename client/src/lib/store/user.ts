import { atom } from 'jotai';

const userAtom = atom<User | undefined>(undefined);
userAtom.debugLabel = 'userAtom';

export default userAtom;
