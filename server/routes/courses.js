const coursesController = require('../controllers').courses;

module.exports = (app, ensureLoggedIn, user) => {
	
	app.post('/api/courses', ensureLoggedIn(), user.is('admin'), coursesController.create);
	app.get('/api/courses', ensureLoggedIn(), coursesController.list);
	app.get('/api/courses/:courseId', ensureLoggedIn(), coursesController.retrieve);
	app.patch('/api/courses/:courseId', ensureLoggedIn(), user.is('admin'), coursesController.update);
	app.delete('/api/courses/:courseId', ensureLoggedIn(), user.is('admin'), coursesController.destroy);
}