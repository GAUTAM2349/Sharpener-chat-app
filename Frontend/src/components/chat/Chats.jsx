import { useContext } from "react";
import ChatsContext from "../../../utils/ChatsContext";
import UserContext from '../../../utils/UserContext';
import OutgoingMessage from "./OutgoingMessage";
import IncomingMessage from "./IncomingMessage";


const Chats = () => {

    const {chats} = useContext(ChatsContext);
    const {user} = useContext(UserContext);
    console.log("user is ",user);

    return (
        <>

        {chats.map( (chat,idx) => {
            
            if(chat.senderId == user?.id)
            return  (<OutgoingMessage key={idx+"chat"} chat={chat}/>)
            return (<IncomingMessage key={idx+"chat"} chat={chat}/>)
            
        }) }
        
        </>
    )
    
}

export default Chats;