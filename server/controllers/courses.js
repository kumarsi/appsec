const Course = require('../models').Course;
const Module = require('../models').Module;

module.exports = {
	create(req, res) {
		return Course
			.create({name: req.body.name})
			.then(course => res.status(201).send(course))
			.catch(err => res.status(400).send(err))
	},
	list(req, res) {
		return Course
			.findAll({
				include: [{
					model: Module,
					as: 'modules'
				}]
			})
			.then(courses => res.status(200).send(courses))
			.catch(err => res.status(400).send(err))
	},

	retrieve(req, res) {
		return Course
			.findById(req.params.courseId, {
				include: [{
					model: Module,
					as: 'modules'
				}]
			})
			.then(c => {
				if (!c) {
					return res.status(400).send({
						message: 'Course not found'
					});
				}
				return res.status(200).send(c);
			})
			.catch(err => res.status(400).send(err));
	}
}