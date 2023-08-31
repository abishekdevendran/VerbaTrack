import db from '@/database/drizzle/setup';
import { auth } from '@/lib/lucia';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	const authHandler = auth.handleRequest(req, res);
	// check if session exists
	const session = await authHandler.validate();
	if (!session) return res.status(401).json({ message: 'Unauthorized' });
	// get all tasks for user
	// const tasks = await db.query.task.findMany({
	// 	where: (task, {eq}) => eq(task.userId, session.user.userId),
	// });
	// // get all events for user
	// const events = await db.query.event.findMany({
	// 	where: (event, {eq}) => eq(event.userId, session.user.userId),
	// });
	const [tasks, events] = await db.transaction(async (tx) => {
		const tasks = await tx.query.task.findMany({
			where: (task, { eq }) => eq(task.userId, session.user.userId),
		});
		const events = await tx.query.event.findMany({
			where: (event, { eq }) => eq(event.userId, session.user.userId),
		});
		return [tasks, events];
	});

	// get user
	return res.json({
		user: {
			...session.user,
			// remove sensitive data
			userId: undefined,
			tasks,
			events,
		},
	});
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
