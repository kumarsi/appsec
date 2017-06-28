const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (['kumarsi', 'harineem'].includes(username) && password === 'secret') {
			done(null, {'email': `${username}@thoughtworks.com`})
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