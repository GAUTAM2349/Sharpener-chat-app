import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chats from "./Chats";
import ChatInput from "./ChatInput";
import ChatsContext from "../../../utils/ChatsContext";
import api from "../../../config/axiosConfig";

const Chatpage = ({ currGroup }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const groupId = currGroup;
        const response = await api.get(`/chat/${groupId}`);

        const allChats = response.data;

        setChats(allChats);
      } catch (error) {
        console.log("Error fetching group chats:", error);
      }
    };

    if (currGroup) {
      getChats();
    }
  }, [currGroup]);

  return (
    <div className="h-[93vh] w-full flex flex-col bg-amber-200 relative">
      <div className="flex-1 overflow-y-auto px-2">
        <ChatsContext.Provider value={{ chats }}>
          <Chats />
        </ChatsContext.Provider>
      </div>
      <ChatInput groupId={currGroup} />
    </div>
  );
};

export default Chatpage;
