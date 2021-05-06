const router = require('express').Router();
const { User, Post, Vote } =  require('../../models');

// Get Users
router.get('/', (req, res) => {
	User.findAll({
		attributes: { exclude: ['password'] }
	})
	.then(dbUserData => res.json(dbUserData))
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// Post Users
router.post('/', (req, res) => {
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})
	.then(dbUserData => res.json(dbUserData))
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

module.exports = router;