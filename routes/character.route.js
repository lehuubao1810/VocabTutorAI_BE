import express from 'express';
import { createCharacter, deleteCharacter, getCharacters, editCharacter } from '../controllers/character.controller.js';


const routerCharacter = express.Router();

routerCharacter.post('/createCharacter', createCharacter);

routerCharacter.get('/getCharacters', getCharacters);

routerCharacter.delete('/deleteCharacter/:id', deleteCharacter);

routerCharacter.put('/editCharacter/:id', editCharacter);

export default routerCharacter;