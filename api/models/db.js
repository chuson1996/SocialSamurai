import mongoose from 'mongoose';
import config from '../../src/config'
import readLine from 'readline';

const dbURI = config.mongo.endpoint;
mongoose.connect(dbURI);


if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

const shutdown = (msg, callback) => {
    console.log('Mongoose disconnected through ' + msg);
    callback();
};

process.once('SIGUSR2', () => {
    shutdown('restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    shutdown('app termination', () => {
        process.exit(0);
    });
});

// Load schema here
import './user';
import './challenge';
