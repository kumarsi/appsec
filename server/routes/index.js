const coursesController = require('../controllers').courses;

module.exports = app => {
	app.get('/api', (_, res) => 
		res.status(200)
			.send({message: 'Welcome to the appsec apis'}));

	app.post('/api/courses', coursesController.create);
}