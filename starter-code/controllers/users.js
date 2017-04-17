var passport = require("passport")

// GET /signup
function getSignup(request, response, next) {
	response.render('signup.ejs', {message: request.flash('signupMessage')}
		);
}

// POST /signup
function postSignup(request, response, next) {
	console.log("in post singup");
	var signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	});
	return signupStrategy(request, response, next);
}

// GET /login
function getLogin(request, response) { 
}

// POST /login 
function postLogin(request, response) {
}

// GET /logout
function getLogout(request, response) {
}

// Restricted page
function secret(request, response){
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret
}