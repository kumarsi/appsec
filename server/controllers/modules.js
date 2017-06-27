const Module = require('../models').Module;

module.exports = {
	create(req, res) {
		return Module
			.create({
				name: req.body.name,
				courseId: req.params.courseId
			})
			.then(module => res.status(201).send(module))
			.catch(err => res.status(500).send(err));
	}
}