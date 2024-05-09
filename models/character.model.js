import mongoose from "mongoose";

const COLLECTION_NAME = "Characters";

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  personality: {
    type: String,
    required: true,
  },
  firstGreet: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
});

const Character = mongoose.model("Character", characterSchema, COLLECTION_NAME);
export default Character;
