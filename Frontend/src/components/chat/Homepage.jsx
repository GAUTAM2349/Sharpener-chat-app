import Chats from "./Chats";
import ActiveUsers from "./ActiveUsers";
import { useContext, useEffect, useState } from "react";

import ChatInput from "./ChatInput";
import ChatsContext from "../../../utils/ChatsContext";
import api from "../../../config/axiosConfig";
import UserContext from "../../../utils/UserContext";

const Homepage = () => {
  
  const {chats:defaultChat} = useContext(ChatsContext);
  const {user} = useContext(UserContext);
  const [ chats, setChats] = useState(defaultChat);
  const [ temp, setTemp ] = useState(0);
  console.log("in homepage chat is ",chats);

  
  
  useEffect( () => {

    const getChats = async() => {

     try{

      console.log("TTTTTTTTTTT is ",temp);

      const response = await api.get(`/chat/${user.id}`);

      console.log("response",response.data);
      setChats(response.data);
     }catch(error){
      console.log(error);
     }

      
    }

    getChats();
    
  },[temp])

  return (
    <>
      <div className="h-[100%] bg-amber-200 !scroll-smooth">
        <ActiveUsers />
        <ChatsContext.Provider value={{chats : chats}}>
        <Chats />
        </ChatsContext.Provider>
        <ChatInput setTemp={setTemp}/>
      </div>
    </>
  );
};

export default Homepage;
