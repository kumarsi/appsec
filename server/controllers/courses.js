const Course = require('../models').Course;

module.exports = {
	create(req, res) {
		return Course
			.create({name: req.body.name})
			.then(course => res.status(201).send(course))
			.catch(err => res.status(400).send(err))
	}
}