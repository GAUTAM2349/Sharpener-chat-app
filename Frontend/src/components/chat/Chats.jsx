import { useContext, useEffect, useRef } from "react";
import ChatsContext from "../../../utils/ChatsContext";
import UserContext from '../../../utils/UserContext';
import OutgoingMessage from "./OutgoingMessage";
import IncomingMessage from "./IncomingMessage";


const Chats = () => {

    const {chats} = useContext(ChatsContext);
    const {user} = useContext(UserContext);
    const bottomRef = useRef(null);

    useEffect(() => {
      
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats]);

    

    return (
        <>

        {chats.map( (chat,idx) => {
            
            if(chat.senderId == user?.id)
            return  (<OutgoingMessage key={idx+"chat"} chat={chat}/>)
            return (<IncomingMessage key={idx+"chat"} chat={chat}/>)
            
        }) }
         <div ref={bottomRef} />
        </>
    )
    
}

export default Chats;