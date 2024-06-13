import mongoose, { Schema } from 'mongoose';


const messageSchema = new Schema(
  {
    sender: {
      type: String,
      enum: ['user', 'ai'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat.messages', // Reference to another message within the same chat
      default: null,
    },
  }
);

// Chat Schema
const chatSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

export const Chat = mongoose.model('Chat', chatSchema);
