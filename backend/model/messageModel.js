// creating the schema for the messages
// this will include
// name/id of the of sender
// content of the message
// reference to the chat it belongs to

const mongoose = require('mongoose');

const messageModel = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        content: {
            type: String,
            trim: true
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        }
    },

    // insert new field to allow mongoose to create a 
    // timestamp for each time a new data ia added
    {
        timestamps: true
    }
)

const Message = mongoose.model("Message", messageModel);

module.exports = { Message };