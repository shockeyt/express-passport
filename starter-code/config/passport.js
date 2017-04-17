var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


module.exports = function(passport) {
	//keeps the user signed in
	passport.serializeUser(function(user, callback) {
		callback(null, user.id);
	});
	//check if a user is logged in
	passport.deserializeUser(function(id, callback) {
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});
	console.log("we are above use");
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'passport',
		passReqToCallback: true
	}, function(req, email, password, callback) {//find a user with this email
		console.log("hey");
		User.findOne({'local.email' : email}, function(err, user){
			console.log("hello");
			if (err) return callback(err);
			//If there alread is a user with this email
			if (user) {
				return callback(null, false, req.flash('signupMessage', 'This email is alread used.'));
			} else {
				//There is no user registered with this email

				//create a new user
				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.encrypt(password);

				newUser.save(function(err) {
					if (err) throw err;
					return callback(null, newUser);
				});
			}
		});
	}));
};