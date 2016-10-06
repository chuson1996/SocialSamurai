import passport from 'passport';
import mongoose from 'mongoose';
import {getUser} from './util';

let User = mongoose.model('User');
let Challenge = mongoose.model('Challenge');

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
			sendJSONresponse(res, 404, err);
			return;
		}
		const token = user.generateJwt();
		sendJSONresponse(res, 200, {
			token
		});
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
			sendJSONresponse(res, 200, {
				token
			});
			return;
		}

		sendJSONresponse(res, 401, info);
	})(req, res);
}

export function session(req, res) {
	getUser(req, res, (req, res, user) => {
		Challenge
			.find({})
			.limit(user.level)
			.populate('comments._creator')
			.populate('comments.comments._creator')
			.exec((err, challenges) => {
				if (err) {
					sendJSONresponse(res, 400, err);
					return;
				}
				sendJSONresponse(res, 200, {
					user: user,
					challenges: challenges
				});
				return;
			});
	})
}
