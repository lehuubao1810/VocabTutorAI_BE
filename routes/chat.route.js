import express from 'express';

import { createMessage, createConversation, getConversation, getConversationsByUser, deleteConversation } from '../controllers/conversation.controller.js';

const routerChat = express.Router();

routerChat.post('/sendMessage/:id', createMessage);

routerChat.post('/createConversation', createConversation);

routerChat.get('/getConversationsByUser', getConversationsByUser);

routerChat.get('/getConversation/:id', getConversation);

routerChat.delete('/deleteConversation/:id', deleteConversation);

export default routerChat;