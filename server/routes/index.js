const coursesController = require('../controllers').courses;
const modulesController = require('../controllers').modules;

module.exports = app => {
	app.get('/api', (_, res) => 
		res.status(200)
			.send({message: 'Welcome to the appsec apis'}));

	app.post('/api/courses', coursesController.create);
	app.get('/api/courses', coursesController.list);
	app.post('/api/courses/:courseId/modules', modulesController.create);
}