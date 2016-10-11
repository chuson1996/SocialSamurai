import mongoose from 'mongoose';
import {getUser} from './util';
const Challenge = mongoose.model('Challenge');
// const User = mongoose.model('User');

const sendJSONresponse = (res, status, content) => {
	res.status(status);
	res.json(content);
};

const addComment = (req, res, challenge, user) => {
	if (!challenge) {
		sendJSONresponse(res, 404, {
			message: 'Challenge not found'
		});
		return;
	}
	challenge.comments.push({
		_creator: user,
		body: req.body.body,
		comment: []
	});
	challenge.save((err, _challenge) => {
		if (err) {
			sendJSONresponse(res, 400, err);
			return;
		}
		sendJSONresponse(res, 201, _challenge.comments[_challenge.comments.length - 1]);
		return;
	});
};

const add2ndComment = (req, res, challenge, user) => {
	if (!challenge) {
		sendJSONresponse(res, 404, {
			message: 'Challenge not found'
		});
		return;
	}
	if (!challenge.comments || challenge.comments.length === 0) {
		sendJSONresponse(res, 404, {
			message: 'Comment not found'
		});
		return;
	}
	const comment = challenge.comments.id(req.params.commentId);
	if (!comment) {
		sendJSONresponse(res, 404, {
			message: 'Comment not found'
		});
		return;
	}
	comment.comments.push({
		_creator: user,
		body: req.body.body
	});
	challenge.save((err) => {
		if (err) {
			sendJSONresponse(res, 400, err);
			return;
		}
		sendJSONresponse(res, 201, comment.comments[comment.comments.length - 1]);
		return;
	});
};

export function commentCreate(req, res) {
	if (!req.body.body) {
		sendJSONresponse(res, 404, {
			message: 'Empty comment'
		});
		return;
	}
	getUser(req, res, (_req, _res, user) => {
		if (!req.params.level) {
			sendJSONresponse(res, 404, {
				message: 'No level in the request'
			});
			return;
		}
		Challenge
			.findOne({level: _req.params.level})
			.select('comments')
			.exec((err, challenge) => {
				if (err) {
					sendJSONresponse(res, 400, err);
					return;
				}
				addComment(_req, _res, challenge, user);
				return;
			});
	});
}

export function comment2ndCreate(req, res) {
	if (!req.body.body) {
		sendJSONresponse(res, 404, {
			message: 'Empty comment'
		});
		return;
	}
	getUser(req, res, (_req, _res, user) => {
		if (!_req.params.level) {
			sendJSONresponse(_res, 404, {
				message: 'No level in the request'
			});
			return;
		}
		if (!_req.params.commentId) {
			sendJSONresponse(_res, 404, {
				message: 'No commentId in the request'
			});
			return;
		}
		Challenge
			.findOne({level: _req.params.level})
			.select('comments')
			.exec((err, challenge) => {
				if (err) {
					sendJSONresponse(_res, 400, err);
					return;
				}
				add2ndComment(_req, _res, challenge, user);
				return;
			});
	});
}
