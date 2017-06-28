const Enrollment = require('../models').Enrollment;


module.exports = {
	create(req, res) {
		return Enrollment
			.create({
				moduleId: req.params.moduleId,
				user: req.user.id,
				completionStatus: Enrollement.Status.IN_PROGRESS
			})
			.then(enrollment => res.status(201).send(enrollment))
			.catch(err => res.status(500).send(err));
	},

	retrieve(req, res) {
		return Enrollment
			.findOne({
				where: {
					moduleId: req.params.moduleId,
					user: req.user.id
				}
			})
			.then(enrollment => {
				if (!enrollment) {
					return res.status(404).send({message: 'User not enrolled in module'})
				}
				return res.status(200).send(enrollment);
			})
			.catch(err => res.status(500).send(err));
	},

	update(req, res) {
		return Enrollment.
			findOne({
				where: {
					moduleId: req.params.moduleId,
					user: req.user.id
				}
			})
			.then(enrollment => {
				if (!enrollment) {
					return res.status(404).send({message: 'User not enrolled in module'});
				}
				//Resetting slidesReviewed to 0 is not supported
				return enrollment
					.update({
						completionStatus: req.body.completionStatus || enrollment.completionStatus,
						slidesReviewed: req.body.slidesReviewed || enrollment.slidesReviewed
					})
					.then(() => res.status(200).send(enrollment))
					.catch(err => res.status(500).send(err))
			})
			.catch(err => res.status(500).send(err));
	},

	destroy(req, res) {
		return Enrollment.
			findOne({
				where: {
					moduleId: req.params.moduleId,
					user: req.user.id
				}
			})
			.then(enrollment => {
				if (!enrollment) {
					return res.status(404).send({message: 'User not enrolled in module'});
				}
				return enrollment
					.destroy()
					.then(() => res.status(204).send())
					.catch(err => res.status(500).send(err))
			})
			.catch(err => res.status(500).send(err));
	}
}