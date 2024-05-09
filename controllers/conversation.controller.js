import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import dotenv from "dotenv";

import Conversation from "../models/conversation.model.js";
import { Types } from "mongoose";
import fs from "fs";
import Character from "../models/character.model.js";

dotenv.config();

// Access your API key as an en vironment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const generationConfig = {
  stopSequences: ["red"],
  // maxOutputTokens: 200,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

export const createMessage = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const { message } = req.body;

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings,
    });

    const chat = model.startChat({
      history: conversation.history,
      generationConfig,
    });

    // const result = await chat.sendMessage(message, { role: "user" });
    const result = await chat.sendMessageStream(message, { role: "user" });
    // const response = await result.response;
    // const text = response.text();
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");
    res.status(200);

    let text = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      text += chunkText;
      res.write(chunkText);
    }

    const updatedConversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          history: {
            $each: [
              {
                role: "user",
                parts: message,
              },
              {
                role: "model",
                parts: text,
              },
            ],
          },
        },
      },
      { new: true }
    );
    // return res.status(200).json({
    //   response: text,
    // });
    res.end();
  } catch (error) {
    console.log("Error catch in sendMessage: ", error);
    // return res.status(500).json({ error: error.message });
    res.write(
      "Phản hồi đã bị chặn vì vi phạm **CHÍNH SÁCH AN TOÀN**.\n\n Câu hỏi của bạn và câu phản hồi này sẽ **KHÔNG ĐƯỢC LƯU LẠI** ."
    );
    res.end();
  }
};

export const getConversation = async (req, res) => {
  try {
    const id = new Types.ObjectId(req.params.id);
    const conversation = await Conversation.findById(id).populate("character");

    conversation.history.splice(0, 3); 

    return res.status(200).json({
      status: "success",
      data: {
        conversation,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createConversation = async (req, res) => {
  try {
    const character = await Character.findById(req.body.character);
    const conversation = await Conversation.create(req.body);
    if (!conversation) {
      return res.status(404).json({ error: "Can not create conversation" });
    }
    // update history
    const initialMessages = [
      {
        role: "user",
        parts: `You will become a character in this conversation base on infomation: ${character.information}, personality: ${character.personality}.        You will answer me or chat with me like you are this character.         Start chat after I send "Start chat AI", reply me ${character.firstGreet}.        Don't answer any question if the information is not provided by me (return like "Sorry, I have something want to keep in secret" when be asked).        Try to act naturally like the character's personality.        Focus on reminding and correcting grammar or vocabulary errors when detected.        If you understand, reply me just "OK"`,
      },
      {
        role: "model",
        parts: "OK",
      },
      {
        role: "user",
        parts: "Start chat AI",
      },
      {
        role: "model",
        parts: `${character.firstGreet}`,
      },
    ];

    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversation._id,
      {
        $push: {
          history: {
            $each: initialMessages,
          },
        },
      },
      { new: true }
    );

    return res.status(201).json({
      status: "success",
      data: {
        conversation: updatedConversation,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getConversationsByUser = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      uid: req.params.uid,
    }).populate("character");
    // find conversation by characterId
    return res.status(200).json({
      status: "success",
      data: {
        conversations,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
