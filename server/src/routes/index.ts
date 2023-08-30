import authRouter from './auth';
import userRouter from './user';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

router.use('/', (req, res) => {
	res.send('Hello World!');
});

router.use('*', (req, res) => {
	res.status(404).json({
		message: 'Not Found',
	});
});

export default router;
