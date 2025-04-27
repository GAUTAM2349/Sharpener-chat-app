const { Chat } = require("../models");

const getChats = async (req, res) => {

  const user = 1; // to be set
  

};

const addChat = async (req, res) => {

  const user = 1; // to be set
  const { senderId, receiverId, message } = req.body;

  try{

    if( !receiverId || message.length == 0 ) return res.status(400).json({message : "invalid request"});
    
    await Chat.create({
        senderId,
        receiverId,
        message
    })

  }catch(error){
    console.log(error);
    res.status(500).json(error);
  }

};

module.exports = {getChats, addChat}
