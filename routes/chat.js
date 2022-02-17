import express from "express";
import {sendMessage,showFriends,showMessages} from '../controllers/chat.js'

const router= express.Router();

router.get('/',showFriends);
router.post('/',showMessages);
router.post('/sendmsg',sendMessage)

export default router;