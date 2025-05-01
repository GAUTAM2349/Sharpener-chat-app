
const { Op } = require("sequelize");
const { Chat } = require("../models");

const getChats = async (req, res) => {
  const {groupId} = req.params; 
  console.log("\n\n\n\nid is ",groupId);
  try {
    const chats = await Chat.findAll({
      where: {
        groupId
      },
      order: [['createdAt', 'ASC']]  // Order chats by the most recent
    });

    if (!chats) {
      return res.status(404).json({ message: "No chats found" });
    }

    return res.status(200).json(chats);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const addChat = async (req, res) => {
  
  const { senderId, groupId, message } = req.body;
  console.log("\n\n req infor sender, group , message ",senderId, groupId, message);

  try {
    if (!senderId || !groupId || !message || message.length === 0) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const chat = await Chat.create({
      senderId,
      groupId,
      message,
      
    });

    return res.status(201).json(chat);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getChats, addChat };

