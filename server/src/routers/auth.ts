import { isLoggedIn, localVerifyCallback, logout } from '@/controllers/auth';
import passport from '@/lib/passport';
import { Router } from 'express';

const router = Router();

router.get('/isLoggedIn', isLoggedIn);
router.get('/logout', logout);

router.get('/github', passport.authenticate('github'));
router.get(
	'/github/callback',
	passport.authenticate('github', { failureRedirect: '/auth/error' }),
	(req, res) => {
		res.status(200).redirect(`${process.env.FRONTEND_URL}?message=success`);
	}
);

router.post('/login', localVerifyCallback);

router.use('/error', (req, res) => {
	res.status(401).json({ message: 'Login failed' });
});

export default router;
