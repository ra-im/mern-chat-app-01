const asyncHandler = require('express-async-handler');
const { User } = require('../model/userModel');
const { createToken } = require('../config/createToken');

/**
 * note - error handling is done by express-aync-handler
 */

const signupUser = asyncHandler(async (req, res) => {
    // get name, email, password, pic from request body
    const { name, email, password, pic } = req.body;

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('request', req.body);
    
    // handle empty fields
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Fill up the required fields');
    }

    // create variable to return true if user email already exists
    const userExist = await User.findOne({ email });

    // handle already created user
    if (userExist) {
        res.status(400);
        throw new Error('User with this e-mail already exists')
    }

    // creste a a new user with the new details
    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    // if the user was created
    if (user) {
        // send user details as response
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            // JWT (Json Web Token) for newly registered user
            token: createToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Oops, unable to create user...')
    }
});

const signinUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // handle empty fields
    if (!email || !password) {
        res.status(400);
        throw new Error('Fill up the required field');
    }

    // variable to validate user existence
    userExist = await User.findOne({ email });

    // handle unknown/unregistered users
    if (!userExist) {
        res.status(400);
        console.log('User with this e-mail does not exist')
    } else if (userExist && (await userExist.validatePasswd(password))) {
        res.json({
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
            pic: userExist.pic,
            token: createToken(userExist._id)
        })
    } else {
        res.status(401);
        throw new Error('incorrect e-mail or password');
    }
});

const allUsers = asyncHandler(async (req, res) => {
// this api controller targets the /api/user endpoint
// requests can be made through the body by using
// the post requests => /api/user || /api/user:id
// or
// queries => /api/user?keyword=value

    // req.query.nameOfQuery
    // however, when tryiong to get _id we use req.params._id
    const keyword = req.query.search
        ? {
            // using the $or operator in mongoBD to execute some logic
            // if anyone of the array of condtionals is true
            $or: [
                { name: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } },
            ]
        } : {};

     console.log(keyword);

    // make query to mongoDB
    const users = await User
        .find(keyword) // find user by keyword
        .find({ _id: { $ne: req.user._id } }); // exclude the user making the request
        // to access the value of req.user._id, we must first
        // authenticate the current user (i.e signin)
        // and successfully validate the JWT (token)
    
    res.send(users);
});

module.exports = { signupUser, signinUser, allUsers };