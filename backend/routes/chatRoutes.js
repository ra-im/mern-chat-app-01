const express = require('express');
const { authenticate } = require('../middlewares/userAuth');
const { duoChat, allChats } = require('../controller/chatControllers');

const router = express.Router();

router.route('/')
	.post(authenticate, duoChat)
	.get(authenticate, allChats);

//router.post('/createGroupChat', authenticate, createGroupChat);
//router.put('/renameGroupChat', authenticate, renameGroupChat);
//router.put('/leaveGroupChat', authenticate, leaveGroupChat);
//router.put('/joinGroupChat', authenticate, joinGroupChat);

module.exports = router;