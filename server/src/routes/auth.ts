import db from '@/database/drizzle/setup';
import { auth, githubAuth, googleAuth } from '@/lib/lucia';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { Router } from 'express';
import { parseCookie } from 'lucia/utils';

const router = Router();

// Create a new Github authorization url, where the user should be redirected to. When generating an authorization url, Lucia will also create a new state. This should be stored as a http-only cookie to be used later.

router.get('/github', async (req, res) => {
	const [url, state] = await githubAuth.getAuthorizationUrl();
	console.log('url: ', url);
	console.log('state: ', state);
	res.cookie('github_oauth_state', state, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 60 * 60, // 1 hour
	});
	return res.status(302).setHeader('Location', url.toString()).end();
});

/* 
Create your OAuth callback route that you defined when registering an OAuth app with Github, and handle GET requests.

When the user authenticates with Github, Github will redirect back the user to your site with a code and a state. This state should be checked with the one stored as a cookie, and if valid, validate the code with GithubProvider.validateCallback(). This will return GithubUserAuth if the code is valid, or throw an error if not.

After successfully creating a user, we’ll create a new session with Auth.createSession() and store it as a cookie with AuthRequest.setSession(). AuthRequest can be created by calling Auth.handleRequest() with Express’ Request and Response.

You can use parseCookie() provided by Lucia to read the state cookie. 
*/

router.get('/github/callback', async (req, res) => {
	const cookies = parseCookie(req.headers.cookie ?? '');
	const storedState = cookies.github_oauth_state;
	const state = req.query.state;
	const code = req.query.code;
	console.log('storedState: ', storedState);
	console.log('state: ', state);
	console.log('code: ', code);
	// validate state
	if (
		!storedState ||
		!state ||
		storedState !== state ||
		typeof code !== 'string'
	) {
		return res.sendStatus(400);
	}
	try {
		// validate, get/create user
		console.log('validate, get/create user');
		const { getExistingUser, githubUser, createUser } =
			await githubAuth.validateCallback(code);
		console.log('githubUser: ', githubUser);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			const user = await createUser({
				attributes: {
					github_username: githubUser.login,
					email: githubUser.email,
					username: githubUser.login,
					name: githubUser.name,
				},
			});
			return user;
		};

		const user = await getUser();

		// create session
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});
		const authRequest = auth.handleRequest(req, res);
		authRequest.setSession(session);
		return res.status(302).setHeader('Location', '/').end();
	} catch (e) {
		console.log(e);
		if (e instanceof OAuthRequestError) {
			// invalid code
			console.log('invalid code');
			return res.sendStatus(400);
		}
		return res.sendStatus(500);
	}
});

router.get('/google', async (req, res) => {
	const [url, state] = await googleAuth.getAuthorizationUrl();
	res.cookie('google_oauth_state', state, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 60 * 60,
	});
	return res.status(302).setHeader('Location', url.toString()).end();
});

router.get('/google/callback', async (req, res) => {
	const cookies = parseCookie(req.headers.cookie ?? '');
	const storedState = cookies.google_oauth_state;
	const state = req.query.state;
	const code = req.query.code;
	// validate state
	if (
		!storedState ||
		!state ||
		storedState !== state ||
		typeof code !== 'string'
	) {
		return res.sendStatus(400);
	}
	try {
		// validate, get/create user
		const { getExistingUser, googleUser, createUser, createKey } =
			await googleAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			if (googleUser.email_verified && googleUser.email) {
				// check if user already exists with email
				const existingDatabaseUserWithEmail = await db.query.user.findFirst({
					where: (user, { eq }) => eq(user.email, googleUser.email!),
				});
				if (existingDatabaseUserWithEmail) {
					// transform `UserSchema` to `User`
					const user = auth.transformDatabaseUser(
						existingDatabaseUserWithEmail,
					);
					await createKey(user.userId);
					return user;
				}
			}
			const user = await createUser({
				attributes: {
					email: googleUser.email ?? null,
					username: null,
					github_username: null,
					name: googleUser.name,
				},
			});
			return user;
		};

		const user = await getUser();

		// create session
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});
		const authRequest = auth.handleRequest(req, res);
		authRequest.setSession(session);
		return res.status(302).setHeader('Location', '/').end();
	} catch (e) {
		console.log(e);
		if (e instanceof OAuthRequestError) {
			// invalid code
			return res.sendStatus(400);
		}
		return res.sendStatus(500);
	}
});

export default router;
