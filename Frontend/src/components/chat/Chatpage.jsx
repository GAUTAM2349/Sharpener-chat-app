// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Chats from "./Chats";
// import ChatInput from "./ChatInput";
// import ChatsContext from "../../../utils/ChatsContext";
// import api from "../../../config/axiosConfig";

// const Chatpage = ({ currGroup }) => {
//   const [chats, setChats] = useState([]);

//   useEffect(() => {
//     const getChats = async () => {
//       try {
//         const groupId = currGroup;
//         const response = await api.get(`/chat/${groupId}`);
//         const allChats = response.data;
//         setChats(allChats);

//         const res = await api.get(`/group/group-members/${groupId}`);
//         console.log("got members response \n", res);

//       } catch (error) {
//         console.log("Error fetching group chats:", error);
//       }
//     };

//     if (currGroup) {
//       getChats();
//     }
//   }, [currGroup]);

//   return (
//     <div className="h-[93vh] w-full flex flex-col bg-amber-200 relative">
//       <div className="absolute top-0 py-2 px-3 bg-green-600 left-11">Group Info</div>
//       <div className="flex-1 overflow-y-auto px-2">
//         <ChatsContext.Provider value={{ chats }}>
//           <Chats />
//         </ChatsContext.Provider>
//       </div>
//       <ChatInput groupId={currGroup} />
//     </div>
//   );
// };

// export default Chatpage;

import { useState, useEffect } from "react";
import Chats from "./Chats";
import ChatInput from "./ChatInput";
import ChatsContext from "../../../utils/ChatsContext";
import api from "../../../config/axiosConfig";
import GroupInfo from "./GroupInfo"; // Import it
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from 'react-router-dom';

const Chatpage = () => {
  const [chats, setChats] = useState(null);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const { groupId: currGroup, ownerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    const getChats = async () => {
      try {
        const response = await api.get(`/chat/${currGroup}`);
        setChats(response.data);
      } catch (error) {
        console.log("Error fetching group chats:", error);
      }
    };

    if (currGroup) getChats();
  }, [currGroup]);



  return (
    <div className="h-[91vh] w-full flex flex-col bg-amber-200 relative">
      
        <div
          className="absolute top-0 py-2 px-3 bg-green-600 left-11 cursor-pointer text-white rounded hover:bg-green-700"
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
          <div className="flex-1 overflow-y-auto px-2">
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
