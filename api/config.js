import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import mongoose from 'mongoose';

var User = mongoose.model('User');

passport.use(new LocalStrategy({
	usernameField: 'email'
},
	function(username, password, done) {
		User.findOne({ email: username }, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'Incorrect username'
				});
			}
			if (!user.validPassword(password)) {
				return done(null, false, {
					message: 'Incorrect password'
				});
			}
			return done(null, user);
		})
	}
));

const config = {
	MashapeHeaders: {
		'X-Mashape-Key': '1XzINqg3Rfmshizwhfrgi54LAaX5p1Aj9Y5jsn6roqcGczBBD4',
		'Accept': 'application/json'
	},
	BingHeaders: {
		'Ocp-Apim-Subscription-Key': 'cc16679d35514cc7ae9222541c4f259d'
	}
};

export default config;
