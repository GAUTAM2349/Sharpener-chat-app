import { useState, useEffect } from "react";
import Chats from "./Chats";
import ChatInput from "./ChatInput";
import ChatsContext from "../../../utils/ChatsContext";
import api from "../../../config/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../Header/NavBar";



const Chatpage = () => {
  const [chats, setChats] = useState([]);
  const { groupId: currGroup, ownerId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const getChats = async () => {
      let timeCursor = null;

      try {
        let storedChatsRaw = localStorage.getItem("storedChats");
        let storedChats = storedChatsRaw ? JSON.parse(storedChatsRaw) : {};
        let chat = storedChats[currGroup]?.messages;

        if (chat) {
          setChats(chat);
          timeCursor = storedChats[currGroup]?.timeCursor;
        }

        if (!timeCursor) {
          const tenYearsAgo = new Date();
          tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
          timeCursor = tenYearsAgo.toISOString();
        }

        const query = new URLSearchParams({ timeCursor }).toString();

        const response = await api.get(`/chat/${currGroup}?${query}`);
        console.log("your chat responses are:", response.data);

        setChats((prevChats) => {
          const latestChats = [...prevChats, ...response.data.chats];

          storedChats[currGroup] = {
            messages: latestChats.slice(-20),
            timeCursor: latestChats.at(-1)?.createdAt,
          };
          localStorage.setItem("storedChats", JSON.stringify(storedChats));

          return latestChats;
        });
      } catch (error) {
        console.log("Error fetching group chats:", error);
      }
    };

    if (currGroup) getChats();
  }, [currGroup]);

  

  return (
    <div className="h-[100vh]  w-full flex flex-col pb-[100px] bg-amber-200 relative">
      <NavBar />
      <div
        className="absolute z-100 top-2 right-3  w-[150px] py-2 px-3 bg-green-600  cursor-pointer text-white rounded hover:bg-green-700"
        onClick={() => navigate(`/group-info/${currGroup}/${ownerId}`)}
      >
        Group Info
      </div>

      {/* {showGroupInfo && (
        <GroupInfo
          groupId={currGroup}
          
        />
      )} */}

      {chats && (
        <>
          <div className="flex-1 overflow-y-auto px-2 ">
            <ChatsContext.Provider value={{ chats }}>
              <Chats />
            </ChatsContext.Provider>

            <ChatInput groupId={currGroup} />
          </div>
        </>
      )}
    </div>
  );
};

export default Chatpage;
