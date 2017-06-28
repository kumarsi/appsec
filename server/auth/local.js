const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const seedUsers = {
	'kumarsi': {'email': 'kumarsi@thoughtworks.com', 'id': '13319',
	 						'username': 'kumarsi'},
	'harineem': {'email': 'harineem@thoughtworks.com', 'id': '12630',
	 						'username': 'harineem'}
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (password === 'secret') {
    	return done(null, seedUsers[username]);
		}
		done(null, false);
  }));

passport.serializeUser(function(user, done) { 
  // TODO: please read the Passport documentation on how to implement this. We're now
  // just serializing the entire 'user' object. It would be more sane to serialize
  // just the unique user-id, so you can retrieve the user object from the database
  // in .deserializeUser().
  done(null, user);
});

passport.deserializeUser(function(user, done) { 
  // TODO: Again, read the documentation.
  done(null, user);
});




exports = module.exports = passport;