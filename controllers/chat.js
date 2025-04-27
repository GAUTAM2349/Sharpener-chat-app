
const { Op } = require("sequelize");
const { Chat } = require("../models");

const getChats = async (req, res) => {
  const {id} = req.params; 
  console.log("\n\n\n\nid is "+id);
  try {
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [
          { senderId: id },
          { receiverId: id }
        ]
      },
      order: [['createdAt', 'ASC']]  // Order chats by the most recent
    });

    if (!chats || chats.length === 0) {
      return res.status(404).json({ message: "No chats found" });
    }

    return res.status(200).json(chats);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const addChat = async (req, res) => {
  const {id} = req.params; 
  const { senderId, receiverId, message } = req.body;

  try {
    if (!receiverId || !message || message.length === 0) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const chat = await Chat.create({
      senderId,
      receiverId,
      message
    });

    return res.status(201).json(chat);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getChats, addChat };

