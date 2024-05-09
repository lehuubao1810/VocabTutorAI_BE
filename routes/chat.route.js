import express from 'express';

import { createMessage, createConversation, getConversation, getConversationsByUser } from '../controllers/conversation.controller.js';

const routerChat = express.Router();

routerChat.post('/sendMessage/:id', createMessage);

routerChat.post('/createConversation', createConversation);

routerChat.get('/getConversationsByUser', getConversationsByUser);

routerChat.get('/getConversation/:id', getConversation);

export default routerChat;