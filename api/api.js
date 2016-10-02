import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import http from 'http';
import SocketIo from 'socket.io';
import 'models/db';

import {get as abcGet} from './actions/abc';
import * as userController from 'controllers/user';
import * as challengeController from 'controllers/challenge';

const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(session({
	secret: 'socialsamurai',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 60000 },
	// store: sessionStore
}));
app.disable('etag');
app.use(bodyParser.json());

app.get('/abc', abcGet);

// user routes
app.get('/users', userController.userRetrieveList);
app.get('/users/:userId', userController.userRetrieveOne);
app.post('/users', userController.userCreate);
app.put('/users/:userId', userController.userModify);
app.delete('/users/:userId', userController.userDestroy);

// challenge routes
app.get('/challenges', challengeController.challengeRetrieveList);
app.get('/challenges/:challengeId', challengeController.challengeRetrieveOne);
app.post('/challenges', challengeController.challengeCreate);
app.put('/challenges/:challengeId', challengeController.challengeModify);
app.delete('/challenges/:challengeId', challengeController.challengeDestroy);

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
