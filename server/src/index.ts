import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from '@/routers';
import errorHandler from '@/middlewares/errorHandler';
import session from '@/lib/sessionStore';
import passport from '@/lib/passport';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const corsOptions = {
	origin: process.env.FRONTEND_URL,
	credentials: true,
	optionsSuccessStatus: 200
};

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
