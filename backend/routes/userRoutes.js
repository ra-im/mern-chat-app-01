const express = require('express');
const { signupUser, signinUser, allUsers } = require('../controller/userControllers');
const { authenticate } = require('../middlewares/userAuth');

// create an instance of the route usig express
const router = express.Router();

// routes can be created using
// for a single request
// router.post()

// for multiple requests
// router.route('/endpoint')
//         .get(() => {
//         // logic/controller
//     }).post(() => {
//         // logic/controller
//     }).{/* any other request */ }

// signin authentication route for a single user
router.post('/signin', signinUser);

// /api/user route handlers
router.route('/')
	// signup a single user
	.post(signupUser)
	// search for all users
	.get(authenticate, allUsers);

module.exports = router;