import Chats from "./Chats";
import ActiveUsers from "./ActiveUsers";
import { useContext } from "react";
import ActiveUsersContext from "../../../utils/ActiveUsersContext";
import ChatInput from "./ChatInput";

const Homepage = () => {
  const { activeUsers } = useContext(ActiveUsersContext);

  return (
    <>
      <div className="h-[100%] bg-amber-200 !scroll-smooth">
        <ActiveUsers />
        <Chats />
        
        <ChatInput/>
      </div>
    </>
  );
};

export default Homepage;
