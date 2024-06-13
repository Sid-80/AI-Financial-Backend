import { Router } from "express";

import {verifyJWT} from "../Middleware/AuthMiddleware.js"


import {
    createChat,
    sendMessage,
    replyToMessage,
    getChatMessages,
    getUserChats
} from '../Controllers/ChatController.js';

const router = Router();

router.post('/create', verifyJWT, createChat);
router.post('/send', verifyJWT, sendMessage);
router.post('/reply', verifyJWT, replyToMessage);
router.get('/:chatId/messages', verifyJWT, getChatMessages);
router.get('/user', verifyJWT, getUserChats);

export default router;
