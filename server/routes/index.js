const coursesController = require('../controllers').courses;
const modulesController = require('../controllers').modules;
const enrollmentsController = require('../controllers').enrollments;

module.exports = (app, ensureLoggedIn, user) => {
	app.get('/api', (_, res) => 
		res.status(200)
			.send({message: 'Welcome to the appsec apis'}));

	//Administer courses and modules start
	//TODO: Include authentication and authorization

	app.post('/api/courses', ensureLoggedIn(), user.is('admin'), coursesController.create);
	app.get('/api/courses', ensureLoggedIn(), coursesController.list);
	app.get('/api/courses/:courseId', ensureLoggedIn(), coursesController.retrieve);
	app.patch('/api/courses/:courseId', ensureLoggedIn(), user.is('admin'), coursesController.update);
	app.delete('/api/courses/:courseId', ensureLoggedIn(), user.is('admin'), coursesController.destroy);

	app.post('/api/courses/:courseId/modules', ensureLoggedIn(), user.is('admin'), modulesController.create);
	app.get('/api/modules/:moduleId', ensureLoggedIn(), modulesController.retrieve);
	app.patch('/api/modules/:moduleId', ensureLoggedIn(), user.is('admin'), modulesController.update);
	app.delete('/api/modules/:moduleId', ensureLoggedIn(), user.is('admin'), modulesController.destroy);

	//Administer courses and modules end



	//Module enrollments
	app.post('/api/modules/:moduleId/enrollment', ensureLoggedIn(), enrollmentsController.create);
	app.get('/api/modules/:moduleId/enrollment', ensureLoggedIn(), enrollmentsController.retrieve);
	app.patch('/api/modules/:moduleId/enrollment', ensureLoggedIn(), enrollmentsController.update);
	app.delete('/api/modules/:moduleId/enrollment', ensureLoggedIn(), enrollmentsController.destroy);
	//Module enrollments end
}