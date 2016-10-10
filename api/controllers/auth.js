import passport from 'passport';
import mongoose from 'mongoose';
import {getUser} from './util';

const User = mongoose.model('User');
const Challenge = mongoose.model('Challenge');

const sendJSONresponse = (res, status, content) => {
	res.status(status);
	res.json(content);
};

export function register(req, res) {
	console.log(req.body);
	if (!req.body.name || !req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			message: 'Name, email and password are required'
		});
		return;
	}

	const user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.setPassword(req.body.password);

	user.save((err) => {
		if (err) {
			console.log(err);
			sendJSONresponse(res, 404, {
				message: `There is an existing account associated with ${user.email}`
			});
			return;
		}
		const token = user.generateJwt();
		// cookie.save('token', token, { path: '/' }); // Deprecated
		res.cookie('token', token, { maxAge: 900000000, httpOnly: true });

		res.status(200).json({ token });
	});
}

export function login(req, res) {
	if (!req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			message: 'All fields are required'
		});
		return;
	}
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			sendJSONresponse(res, 404, err);
			return;
		}

		if (user) {
			const token = user.generateJwt();
			res.cookie('token', token, { maxAge: 900000000, httpOnly: true });

			res.status(200).json({ token });
			return;
		}

		sendJSONresponse(res, 401, info);
	})(req, res);
}

export function session(req, res) {
	getUser(req, res, (_req, _res, user) => {
		Challenge
			.find({})
			.limit(user.level)
			.populate('comments._creator')
			.populate('comments.comments._creator')
			.exec().then((challenges) => {
				res.status(200).json({
					user: user,
					challenges: challenges
				});
			}).catch((err) => {
				res.status(400).json(err);
			});
	});
}

export function loadAuth(req, res) {
	const token = req.cookies.token;
	if (token) {
		return res
			.status(200)
			.json({
				token: token
			});
	}

	return res.status(401).json({
		message: 'Not authenticated'
	});
}
