import express from 'express';
import { createCharacter, getCharacters } from '../controllers/character.controller.js';


const routerCharacter = express.Router();

routerCharacter.post('/createCharacter', createCharacter);

routerCharacter.get('/getCharacters', getCharacters);

export default routerCharacter;