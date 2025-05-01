// import Chats from "./Chats";
// import ActiveUsers from "./ActiveUsers";
// import { useContext, useEffect, useState } from "react";

// import ChatInput from "./ChatInput";
// import ChatsContext from "../../../utils/ChatsContext";
// import api from "../../../config/axiosConfig";
// import UserContext from "../../../utils/UserContext";

// const Chatpage = () => {
  
//   const {chats:defaultChat} = useContext(ChatsContext);
//   const {user} = useContext(UserContext);
//   const [ chats, setChats] = useState(defaultChat);
//   const [ temp, setTemp ] = useState(0);
//   console.log("in Chatpage chat is ",chats);

  
  
//   useEffect(() => {
//     const getChats = async () => {
//       try {

//         console.log("Fetching chats for user:", user.id);
//         const response = await api.get(`/chat/${user.id}`);
        
//         setChats(response.data);
//       } catch (error) {
//         console.log("Error fetching chats:", error);
//       }
//     };
  
    
//     getChats();
  
    
//     // const intervalId = setInterval(() => {
//     //   getChats();
//     // }, 1000); 
  
    
//     return () => clearInterval(intervalId);
//   }, [user.id]); 
  

//   return (
//     <>
//       <div className="h-[100%] bg-amber-200 !scroll-smooth">
//         <ActiveUsers />
//         <ChatsContext.Provider value={{chats : chats}}>
//         <Chats />
//         </ChatsContext.Provider>
//         <ChatInput setTemp={setTemp}/>
//       </div>
//     </>
//   );
// };

// export default Chatpage;

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chats from "./Chats";
import ChatInput from "./ChatInput";
import ChatsContext from "../../../utils/ChatsContext";
import api from "../../../config/axiosConfig";

const Chatpage = ({currGroup}) => {
  // const { groupId } = useParams();
  const [chats, setChats] = useState([]);
  

  useEffect(() => {
    const getChats = async () => {
      try {
        console.log("curr group is ", currGroup)
        const groupId = currGroup;
        const response = await api.get(`/chat/${groupId}`);
        console.log("respone fo rchat came ", response)
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
    <div className="h-full w-full bg-amber-200 !scroll-smooth flex flex-col">
      {/* Context provides chats to Chats component */}
      <ChatsContext.Provider value={{ chats }}>
        <Chats />
      </ChatsContext.Provider>

      {/* Pass a setter to trigger refresh after sending a new message */}
      <ChatInput groupId={currGroup}  />
    </div>
  );
};

export default Chatpage;
