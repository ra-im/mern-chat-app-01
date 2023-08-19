const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return (
    jwt.sign(
        { id }, // parameter
        process.env.JWT_SECRET, // JWT secret
        { expiresIn: '7d' }  // token expiration
    )
  )
}

module.exports = { createToken };
