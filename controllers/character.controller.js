import Character from "../models/character.model.js";

export const createCharacter = async (req, res) => {
  try {
    const { name, personality, firstGreet, information } = req.body;

    const newCharacter = await Character.create({
      name,
      personality,
      firstGreet,
      information,
    });

    res.status(201).json({
        status: "success",
        data: {
            character: newCharacter,
        },
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find();

    res.status(200).json({ 
        status: "success",
        data: {
            characters,
        },
     });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
