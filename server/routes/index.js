const coursesController = require('../controllers').courses;
const modulesController = require('../controllers').modules;
const enrollmentsController = require('../controllers').enrollments;

module.exports = (app, ensureLoggedIn) => {
	app.get('/api', (_, res) => 
		res.status(200)
			.send({message: 'Welcome to the appsec apis'}));

	//Administer courses and modules start
	//TODO: Include authentication and authorization

	app.post('/api/courses', coursesController.create);
	app.get('/api/courses', coursesController.list);
	app.get('/api/courses/:courseId', coursesController.retrieve);
	app.patch('/api/courses/:courseId', coursesController.update);
	app.delete('/api/courses/:courseId', coursesController.destroy);

	app.post('/api/courses/:courseId/modules', modulesController.create);
	app.get('/api/modules/:moduleId', modulesController.retrieve);
	app.patch('/api/modules/:moduleId', modulesController.update);
	app.delete('/api/modules/:moduleId', modulesController.destroy);

	//Administer courses and modules end



	//Module enrollments
	app.post('/api/modules/:moduleId/enrollment', ensureLoggedIn(), enrollmentsController.create);
	app.get('/api/modules/:moduleId/enrollment', ensureLoggedIn(), enrollmentsController.retrieve);
	app.patch('/api/modules/:moduleId/enrollment', ensureLoggedIn(), enrollmentsController.update);
	app.delete('/api/modules/:moduleId/enrollment', ensureLoggedIn(), enrollmentsController.destroy);
	//Module enrollments end
}