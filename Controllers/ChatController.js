// coreFunctions.js

import { Chat } from "../Models/ChatModel.js";
import { User } from "../Models/UserModel.js";

import { asyncHandler } from "../Utils/AsyncHandler.js";

export const createChatCore = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found!");
  }

  const chat = new Chat({ user: user._id });
  await chat.save();
  return chat;
};

export const sendMessageCore = async (chatId, sender, content) => {
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new Error("Chat not found!");
  }

  const message = { sender, content };

  chat.messages.push(message);
  await chat.save();
  // return chat;
};

export const replyToMessageCore = async (chatId, sender, content, replyToMessageId) => {
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new Error("Chat not found!");
  }

  const message = {
    sender,
    content,
    replyTo: replyToMessageId,
  };

  chat.messages.push(message);
  await chat.save();
  return chat;
};

export const getChatMessagesCore = async (chatId) => {
  const chat = await Chat.findById(chatId).populate("user", "firstname lastname email");
  if (!chat) {
    throw new Error("Chat not found!");
  }

  return chat.messages;
};

export const getUserChatsCore = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found!");
  }

  const chats = await Chat.find({ user: user._id }).select(["_id", "updatedAt"]);
  return chats;
};





// Create a new chat
export const createChat = asyncHandler(async (req, res) => {
  const userId = req.user._id;


  try {
    console.log(req.user)
    const chat = await createChatCore(userId);
    res.status(201).json({ status: "success", data: chat });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating chat!" });
  }
});

// Send a message in a chat
export const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content, sender } = req.body;

  try {
    const chat = await sendMessageCore(chatId, sender, content);
    res.status(200).json({ status: "success", data: chat });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error sending message!" });
  }
});

// TODO : not tested
// Reply to a message in a chat
export const replyToMessage = asyncHandler(async (req, res) => {
  const { chatId, content, replyToMessageId } = req.body;
  const sender = req.user._id;

  try {
    const chat = await replyToMessageCore(chatId, sender, content, replyToMessageId);
    res.status(200).json({ status: "success", data: chat });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error replying to message!" });
  }
});

// Retrieve all messages in a chat
export const getChatMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await getChatMessagesCore(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }
    res.status(200).json({ status: "success", data: chat });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving messages!" });
  }
});

// Get all chats for current user
export const getUserChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const chats = await getUserChatsCore(userId);
    res.status(200).json({ status: "success", data: chats });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving user chats!" });
  }
});
