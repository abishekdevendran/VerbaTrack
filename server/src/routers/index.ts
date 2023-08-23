import { Request, Response, Router } from 'express';
import authRouter from './auth';
const router = Router();

router.use('/auth', authRouter);
router.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

export default router;
