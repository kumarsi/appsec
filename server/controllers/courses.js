const Course = require('../models').Course;

module.exports = {
	create(req, res) {
		console.log(req);
		return Course
			.create({name: req.body.name})
			.then(course => res.status(201).send(course))
			.catch(err => res.status(400).send(err))
	},
	list(req, res) {
		return Course
			.all()
			.then(courses => res.status(200).send(courses))
			.catch(err => res.status(400).send(err))
	}
}