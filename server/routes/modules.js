const modulesController = require('../controllers').modules;
const enrollmentsController = require('../controllers').enrollments;

module.exports = (app, ensureLoggedIn, user) => {
	

	app.post('/api/courses/:courseId/modules', ensureLoggedIn(), user.is('admin'), modulesController.create);
	app.get('/api/modules/:moduleId', ensureLoggedIn(), modulesController.retrieve);
	app.patch('/api/modules/:moduleId', ensureLoggedIn(), user.is('admin'), modulesController.update);
	app.delete('/api/modules/:moduleId', ensureLoggedIn(), user.is('admin'), modulesController.destroy);



	//Module enrollments
	app.post('/api/modules/:moduleId/enrollment', ensureLoggedIn(), enrollmentsController.create);
	app.get('/api/modules/:moduleId/enrollment', ensureLoggedIn(), enrollmentsController.retrieve);
	app.patch('/api/modules/:moduleId/enrollment', ensureLoggedIn(), enrollmentsController.update);
	app.delete('/api/modules/:moduleId/enrollment', ensureLoggedIn(), enrollmentsController.destroy);
	//Module enrollments end
}