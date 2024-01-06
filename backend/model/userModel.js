// creating the schema for the users
// this will include
// name/id of the of user
// email of the user
// password of the user
// display picture of the user

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        pic: {
            type: String,
            required: true,
            default: 'https://cdn-icons-png.flaticon.com/128/1077/1077114.png'
        }
    },

    // insert new field to allow mongoose to create a 
    // timestamp for each time a new data ia added
    {
        timestamps: true
    }
)


// password validation
userModel.methods.validatePasswd = async function (userInput) {
    return await bcrypt.compare(userInput, this.password);
}

// password encryption
userModel.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(16);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userModel);

module.exports = { User };
