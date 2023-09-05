const asyncHandler = require('express-async-handler');
const Chat = require('../model/chatModel');
const { User } = require('../model/userModel');

const duoChat = asyncHandler(async (req, res) => {

	/* single chats */
	const { userId } = req.body;

	// to start a chat, we check if there exists a chat with
	// the current userId and hence return it, otherwise,
	// we create a new chat with the current userId.

	// but first, we validate the existence of userId in req body
	if (!userId) {
		console.log('userId parameter not present in request body');
		return res.sendStatus(400);
	}

	var isChat = await Chat.find({
		// find chats with the following properties
		isGroupChat: false,
		$and: [
			{ users: { $elemMatch: { $eq: req.user._id } } },
			{ users: { $elemMatch: { $eq: userId } } },
		]
	})
		.populate('users', '-password')
		.populate('recentChat');
	
	isChat = await User.populate(isChat, {
		path: 'recentChat.sender',
		select: 'name email pic'
	});

	if (isChat.length > 0) {
		res.send(isChat[0]);

		console.log(isChat[0]);
	} else {
		var chatData = {
			chatName: 'sender',
			isGroupChat: false,
			users: [userId, req.user._id]
		};

		try {
			const newChat = await Chat.create(chatData);

			const allChats = await Chat.findOne({ _id: newChat._id })
				.populate('users', '-password');
			
			res.status(200);
			res.send(allChats)

			console.log(allChats);
		} catch (error) {
			res.status(400);
			throw new Error(error.message);
		}
	}

});

const allChats = asyncHandler(async (req, res) => {
	// check the currently logged in user &
	// query mongoDB for all the chats for this user.

	try {
		Chat.find(
			{ users: { $elemMatch: { $eq: req.user._id } } },
		)
			.populate('users', '-password')
			.populate('groupAdmin', '-password')
			.populate('recentChat')
			.sort({ updatedAt: -1 })
			.then(async (response) => {
				response = await User
					.populate(response, {
						path: 'recentChat.sender',
						select: 'name email pic'
					});
				
				res.status(200).send(response);
			});
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
})

module.exports = { duoChat, allChats };