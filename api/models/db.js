import mongoose from 'mongoose';
import config from '../../src/config'

var dbURI = config.mongo.endpoint;
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

var shutdown = function(msg, callback) {
    console.log('Mongoose disconnected through ' + msg);
    callback();
};

process.once('SIGUSR2', function() {
    shutdown('restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function() {
    shutdown('app termination', function() {
        process.exit(0);
    });
});

// Load schema here
import './user';
import './challenge';