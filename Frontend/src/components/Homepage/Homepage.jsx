import { useState } from "react";
import Sidebar from "./Sidebar";
import Chatpage from "../chat/Chatpage";


const Homepage = () => {

    const[currGroup , setCurrGroup] = useState(null);
    
  return (
    <>
      <div className="flex flex-grow-1">
        <Sidebar setCurrGroup={setCurrGroup} />
        <Chatpage  currGroup={currGroup}/>
      </div>
    </>
  );
};

export default Homepage;
