import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import http from 'http';
import SocketIo from 'socket.io';
import passport from 'passport';
import 'models/db';
import 'config';

import {get as abcGet} from './actions/abc';
import * as userController from 'controllers/user';
import * as challengeController from 'controllers/challenge';
import * as authController from 'controllers/auth';
import * as commentController from 'controllers/comment';
import jwt from 'express-jwt';
import sessionMongoose from 'session-mongoose';
import mongoose from 'mongoose';
import connect from 'connect';
import cookie from 'react-cookie';

const jwtMidleware = jwt({
	secret: 'JWT_SECRET',
	userProperty: 'payload',
	getToken: (req) => {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			return req.headers.authorization.split(' ')[1];
		}

		const token = cookie.load('token');
		// console.log('Token ', token);
		if (token) return token;
		return null;
	}
});

/** MongoDB Setup */
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongo.endpoint, {
	server: {
		socketOptions: { keepAlive: 1 }
	}
});
const MongoSessionStore = sessionMongoose(connect);
const sessionStore = new MongoSessionStore({url: config.mongo.endpoint});

const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(session({
	secret: 'socialsamurai',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 60000 },
	store: sessionStore
}));
app.disable('etag');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get('/abc', abcGet);

// user routes
app.get('/users', jwtMidleware, userController.userRetrieveList);
app.get('/users/:userId', jwtMidleware, userController.userRetrieveOne);
app.post('/users', jwtMidleware, userController.userCreate);
app.put('/users/:userId', jwtMidleware, userController.userModify);
app.delete('/users/:userId', jwtMidleware, userController.userDestroy);

// challenge routes
app.get('/challenges', jwtMidleware, challengeController.challengeRetrieveList);
app.get('/challenges/:challengeId', challengeController.challengeRetrieveOne);
app.post('/challenges', jwtMidleware, challengeController.challengeCreate);
app.put('/challenges/:challengeId', jwtMidleware, challengeController.challengeModify);
app.delete('/challenges/:challengeId', jwtMidleware, challengeController.challengeDestroy);

// comments routes
app.post('/challenges/:challengeId/comments', jwtMidleware, commentController.commentCreate);
app.post('/challenges/:challengeId/comments/:commentId', jwtMidleware, commentController.comment2ndCreate);


// authentication routes
app.post('/register', authController.register);
app.post('/login', authController.login);
app.get('/session', jwtMidleware, authController.session);
app.get('/loadAuth', authController.loadAuth);

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
	const runnable = app.listen(config.apiPort, (err) => {
		if (err) {
			console.error(err);
		}
		console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
		console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
	});

	io.on('connection', (socket) => {
		socket.emit('news', {msg: `'Hello World!' from server`});

		socket.on('history', () => {
			for (let index = 0; index < bufferSize; index++) {
				const msgNo = (messageIndex + index) % bufferSize;
				const msg = messageBuffer[msgNo];
				if (msg) {
					socket.emit('msg', msg);
				}
			}
		});

		socket.on('msg', (data) => {
			data.id = messageIndex;
			messageBuffer[messageIndex % bufferSize] = data;
			messageIndex++;
			io.emit('msg', data);
		});
	});
	io.listen(runnable);
} else {
	console.error('==>     ERROR: No PORT environment variable has been specified');
}

// error handlers
// catch unauthorised errors
app.use((err, req, res) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401);
		res.json({
			message: `${err.name}: ${err.message}`
		});
	}
});
