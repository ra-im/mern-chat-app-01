// creating the schema for the users
// this will include
// name/id of the of user
// email of the user
// password of the user
// display picture of the user

const mongoose = require('mongoose');
const defaultPic = require('../constants/user-icon.png');

const userModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        pic: {
            type: String,
            required: true,
            default: { defaultPic }
        }
    },

    // insert new field to allow mongoose to create a 
    // timestamp for each time a new data ia added
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userModel);

module.exports = { User };