import Character from "../models/character.model.js";
import Conversation from "../models/conversation.model.js";

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
      character: newCharacter,
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
      characters,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing character id" });
    }

    const character = await Character.findById(id);
    if (!character) {
      return res.status(404).json({ message: "Not found character" });
    }
    return res.status(200).json({
      status: "success",
      character,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing character id" });
    }

    const character = await Character.findByIdAndDelete(id);

    // delete conversation have character id
    const deleteConversation = await Conversation.deleteMany({ character: id });
    if (!deleteConversation) {
      return res.status(404).json({ message: "Not found conversation" });
    }

    if (!character) {
      return res.status(404).json({ message: "Not found character" });
    }
    return res.status(200).json({ message: "Character deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const editCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { name, personality } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Missing character id" });
    }

    const updateData = {
      ...(name && { name }),
      ...(personality && { personality }),
    };

    const character = await Character.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    return res.status(200).json({
      status: "success",
      character,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
