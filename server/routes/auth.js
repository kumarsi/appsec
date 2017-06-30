
module.exports = (app, ensureLoggedIn, user, auth) => {
		
	app.get('/api/', (req, res) => res.status(200).send({message: "Say hello to AppSec APIs!", user: req.user}))

	app.post('/api/login', auth.authenticate('local', {failureRedirect: '/api/login'}),
		(req, res) => res.redirect('/api/profile'));

	app.get('/api/login', (_, res) => res.status(200).send({message: 'You must login with a username and password.'}));

	app.post('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/api/login');
	});

	app.get('/api/profile', ensureLoggedIn(), (req, res) => 
		res.status(200).send({message: 'This is your profile', user: req.user}));

	app.get('/api/profile/admin', ensureLoggedIn(), user.is('admin'), (req, res) => 
		res.status(200).send({message: 'This is your admin profile', user: req.user}));

}