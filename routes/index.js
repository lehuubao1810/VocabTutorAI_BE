import express from 'express';

import routerChat from './chat.route.js';
import routerCharacter from './character.route.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('I\'m running!'); 
});

router.use('/chat', routerChat);
router.use('/character', routerCharacter);

export default router;