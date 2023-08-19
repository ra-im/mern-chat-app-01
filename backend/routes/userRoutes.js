const express = require('express');
const { signupUser, signinUser } = require('../controller/userControllers');

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
// signUp authentication route for a single user
router.route('/').post(signupUser);

module.exports = router;