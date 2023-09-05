// creating the schema for the chats
// this will include
// name of the chat
// isGroupChat boolaean
// list of users
// most recent messages
// group admin

const mongoose = require('mongoose');

const chatModel = mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true
        },
        isGroupChat: {
            type: Boolean,
            default: false
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        recentChat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },

    // insert new field to allow mongoose to create a 
    // timestamp for each time a new data ia added
    {
        timestamps: true
    }

);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
