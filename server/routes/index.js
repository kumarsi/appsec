const coursesRoutes = require('./courses')
const modulesRoutes = require('./modules');

module.exports = (app, ensureLoggedIn, user) => {
	app.get('/api', (_, res) => 
		res.status(200)
			.send({message: 'Welcome to the appsec apis'}));

	coursesRoutes(app, ensureLoggedIn, user);
	modulesRoutes(app, ensureLoggedIn, user);
}