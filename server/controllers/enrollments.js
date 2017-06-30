const Enrollment = require('../models').Enrollment;
const Module = require('../models').Module;


module.exports = {
	create(req, res) {
		return Enrollment
			.create({
				moduleId: req.params.moduleId,
				user: req.user.id,
				completionStatus: Enrollment.Status.IN_PROGRESS,
				slidesReviewed: 0
			})
			.then(enrollment => res.status(201).send(enrollment))
			.catch(err => res.status(500).send(err));
	},

	list(req, res) {
		return Enrollment
			.find({
				where: {
					user: req.user.id
				}
			})
			.then(enrollments => {
				return res.status(200).send(enrollments || []);
			})
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
		if (req.body.completionStatus && !Enrollment.Status[req.body.completionStatus]) {
			return res.status(400)
				.send({message: `Unknown enrollment status ${req.body.completionStatus}. Valid statuses: ${Object.keys(Enrollment.Status)}`});
		}
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