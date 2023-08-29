import { auth } from '@/lib/lucia';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	const authHandler = auth.handleRequest(req, res);
	// check if session exists
	const session = await authHandler.validate();
	if (!session) return res.status(401).json({ message: 'Unauthorized' });
	// get user
	return res.json({ user: session.user });
});

router.get('/logout', async (req, res) => {
	try {
		const authHandler = auth.handleRequest(req, res);
		// check if session exists
		const session = await authHandler.validate();
		if (!session) return res.status(401).json({ message: 'Unauthorized' });
		// logout
		await auth.invalidateSession(session.sessionId);
		// respond with success
		return res.json({ message: 'Logged out' });
	} catch (e) {
		return res.json({ message: 'Error' });
	}
});

export default router;
