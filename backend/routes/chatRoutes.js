const express = require('express');
const { authenticate } = require('../middlewares/userAuth');
const {
	duoChat,
	allChats,
	createGroupChat,
	renameGroupChat,
	leaveGroupChat,
	joinGroupChat,
} = require('../controller/chatControllers');

const router = express.Router();

router.route('/')
	.post(authenticate, duoChat)
	.get(authenticate, allChats);

router.post('/creategroupchat', authenticate, createGroupChat);
router.put('/renamegroupchat', authenticate, renameGroupChat);
router.put('/leavegroupchat', authenticate, leaveGroupChat);
router.put('/joingroupchat', authenticate, joinGroupChat);

module.exports = router;
