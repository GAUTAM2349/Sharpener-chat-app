
import axios from "axios"; 
import { useState } from "react";
import api from '../../../config/axiosConfig';

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return; 

    try {
      
      await api.post("/chat", {
        senderId: 1,         
        receiverId: 2,       
        message: message.trim(),
      });

      
      setMessage("");
    } catch (err) {
      console.log("Failed to send message:", err);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-300 p-4 sticky bottom-0">
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`px-4 py-2 rounded-md ml-2 text-white ${
            message.trim()
              ? "bg-indigo-500 hover:bg-indigo-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </div>
    </footer>
  );
};

export default ChatInput;
