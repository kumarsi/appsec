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
	},

	retrieve(req, res) {
		return Module.findById(req.params.moduleId)
			.then(m => {
				if (!m) {
					return res.status(404).send({message: 'Module not found'});
				}
				return res.status(200).send(m);
			})
			.catch(err => res.status(500).send(err));
	},

	update(req, res) {
		return Module.findById(req.params.moduleId)
			.then(m => {
				if (!m) {
					return res.status(404).send({message: 'Module not found'})
				}
				return m
					.update({
						name: req.body.name || m.name
					})
					.then(() => res.status(200).send(m))
					.catch(err => res.status(500).send(err));
			})
			.catch(err => res.status(500).send(err));
	},

	destroy(req, res) {
		return Module.findById(req.params.moduleId)
			.then(m => {
				if (!m) {
					return res.status(404).send({message: 'Module not found'});
				}
				return m
					.destroy()
					.then(() => res.status(204).send())
					.catch(err => res.status(500).send(err));
			})
			.catch(err => res.status(500).send(err));
	}
}