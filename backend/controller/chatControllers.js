const asyncHandler = require('express-async-handler');
const Chat = require('../model/chatModel');
const { User } = require('../model/userModel');
const { chats } = require('../constants');

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
			users: [userId, req.user._id],
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
		Chat.find({
			users: {
				$elemMatch: {
					$eq: req.user._id
				}
			}
		},
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
});

const createGroupChat = asyncHandler(async (req, res) => {
	// to create a group chat, we need
	// group name and the group users
	// from the request body

	// handle the non existence of d group name & users in the req body
	if (!req.body.name || !req.body.users) {
		return res
			.status(400)
			.send({ message: 'fill up the required fields' });
		
	}

	// parse the string entry to JSON for backend
	var users = JSON.parse(req.body.users);

	// validate the number of users in the group
	// atleast 2 users per group
	// this  includes the currently logged in user i.e

	users.push(req.user); // add  current user to the group users

	if (users.length < 2) {
		return res
			.status(400)
			.send('A group must contain atleast 2 users');
	}

	// make query to mongoDB to creae new group chat
	try {
		const groupChat = await Chat.create({
			chatName: req.body.name,
			users: users,
			isGroupChat: true,
			groupAdmin: req.user,
		})

		// fetch the new group chat from DB
		const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
			.populate('users', '-password')
			.populate('groupAdmin', '-password');
		
		res.status(200).json(fullGroupChat);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
})

const renameGroupChat = asyncHandler(async (req, res) => {
	// to rename a group chat, we need to
	// access the group chatId and chatName from d req body
	// then find group chat by id and update the name

	const { chatId, chatName } = req.body;

	const renameChat = await Chat.findByIdAndUpdate(
		chatId,
		{ chatName: chatName },
		{ new: true }, // to return the updated value of group name
	)
		.populate('users', '-password')
		.populate('groupAdmin', '-password');
	
	// validate the existence of newChatName
	if (!renameChat) {
		res.status(404);
		throw new Error('Unable to find the group chat')
	} else {
		res.json(renameChat);
	}
});

const leaveGroupChat = asyncHandler(async (req, res) => {
	// to leave a group / remove a user froma group, we
	// get the group chatId, userId of the user from req body
	// then find group chat by Id and remove

	const { chatId, userId } = req.body;

	const leaveGroup = await Chat.findByIdAndUpdate(
		chatId,
		{ $pull: { users: userId } },
		{ new: true },
	)
		.populate('users', '-password')
		.populate('groupAdmin', '-password');
	
	// validate the existence of a new user
	if (!leaveGroup) {
		res.status(404);
		throw new Error('unable to find the group chat');
	} else {
		res.json(leaveGroup);
	}
});

const joinGroupChat = asyncHandler(async (req, res) => {
	// to join a group / add a user to a group
	// get the group chatId and the userId of the new user from req body
	// then find group chat by id and update

	const { chatId, userId } = req.body;

	const joinGroup = await Chat.findByIdAndUpdate(
		chatId,
		{ $push: { users: userId } },
		{ new: true },
	)
		.populate('users', '-password')
		.populate('groupAdmin', '-password');
	
	// validate the existence of a new user
	if (!joinGroup) {
		res.status(404);
		throw new Error('unable to find the group chat');
	} else {
		res.json(joinGroup);
	}
});

module.exports = {
	duoChat,
	allChats,
	createGroupChat,
	renameGroupChat,
	leaveGroupChat,
	joinGroupChat,
};