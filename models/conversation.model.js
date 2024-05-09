import mongoose, { Schema } from 'mongoose';

const COLLECTION_NAME = 'Conversations';
const DOCUMENT_NAME = 'Conversation';

const conversationSchema = new mongoose.Schema({
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character',
    },
    history: {
        type: Array,
        required: true,
        default: [],
    },
    uid: {
        type: String,
        required: true, 
        default: "guest"
    },
});

const Conversation = mongoose.model(DOCUMENT_NAME, conversationSchema, COLLECTION_NAME);

export default Conversation;