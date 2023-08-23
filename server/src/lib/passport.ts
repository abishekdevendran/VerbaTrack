import { githubVerifyCallback } from '@/controllers/auth';
import passportClass from 'passport';
import { Strategy as GithubStrategyClass } from 'passport-github2';
import dotenv from 'dotenv';

dotenv.config();

const GithubStrategy = new GithubStrategyClass(
	{
		clientID: process.env.GITHUB_CLIENT_ID as string,
		clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		callbackURL:
			((process.env.BACKEND_URL ?? 'http://localhost:5000') as string) +
			'/auth/github/callback',
		scope: ['user:email']
	},
	githubVerifyCallback
);

const passport = new passportClass.Passport();
passport.use(GithubStrategy);

// SerializeUser's return value is accessible in req.session.passport.user
passport.serializeUser((user, done) => {
	done(null, {
		id: user.id,
		fullName: user.fullName,
		email: user.email,
    image: user.image
	});
});
passport.deserializeUser((user, done) => {
	done(null, user as Express.User);
});
export default passport;
