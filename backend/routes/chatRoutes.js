const express = require('express');
const { checkJWT } = require('../middlewares/auth');
const accessChat = require('../controllers/chatControllers');
const router = express.Router();

router.route('/').post(checkJWT, accessChat);
// router.route('/').get(checkJWT, fetchChats);
// router.route('/group').post(checkJWT, createGroup);
// router.route('/rename').put(checkJWT, renameGroup);
// router.route('/removegroup').put(checkJWT, removeFromGroup);
// router.route('/groupadd').put(checkJWT, addToGroup);

module.exports = router;
