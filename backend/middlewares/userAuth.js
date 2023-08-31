const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { User } = require('../model/userModel');

const authenticate = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization
		&& req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// the authorization header is in the format
			// Bearer ndhhddn-token-ghsr5y3y
			// hence we get the token by splitting this header, starting from the space.
			token = req.headers.authorization.split(' ')[1];

			// verify token
			const verified = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User
				.findById(verified.id) // find user in the mongoDB
				.select('-password'); // return user without the password
			
			next();
		} catch (error) {
			res.status(401);
			throw new Error('User unauthorized, token failure');
		}
	}

	// handle the absence of token
	if (!token) {
		res.status(401);
		throw new Error('User unauthorized, token unavailable');
	}
});

module.exports = { authenticate };
