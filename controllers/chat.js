// const { Chat } = require("../models");

// const getChats = async (req, res) => {

//   const user = 1; // to be set
  

// };

// const addChat = async (req, res) => {

//   const user = 1; // to be set
//   const { senderId, receiverId, message } = req.body;

//   try{

//     if( !receiverId || message.length == 0 ) return res.status(400).json({message : "invalid request"});
    
//     await Chat.create({
//         senderId,
//         receiverId,
//         message
//     })

//   }catch(error){
//     console.log(error);
//     res.status(500).json(error);
//   }

// };

// module.exports = {getChats, addChat}

const { Op } = require("sequelize");
const { Chat } = require("../models");

const getChats = async (req, res) => {
  const {id} = req.params; // to be set, ideally from authentication context (e.g., JWT)
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
  const {id} = req.params; // to be set, ideally from authentication context (e.g., JWT)
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

