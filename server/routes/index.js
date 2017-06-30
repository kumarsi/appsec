const coursesRoutes = require('./courses')
const modulesRoutes = require('./modules');
const authRoutes = require('./auth');

module.exports = (app, ensureLoggedIn, user, auth) => {
	app.get('/api', (_, res) => 
		res.status(200)
			.send({message: 'Welcome to the appsec apis'}));

	coursesRoutes(app, ensureLoggedIn, user);
	modulesRoutes(app, ensureLoggedIn, user);
	authRoutes(app, ensureLoggedIn, user, auth);

}