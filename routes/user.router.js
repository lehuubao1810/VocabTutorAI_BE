import express from 'express';

import { deleteUsersFirebase } from '../controllers/user.controller.js';

const routerUser = express.Router();

routerUser.post('/deleteUsersFirebase', deleteUsersFirebase);

export default routerUser;