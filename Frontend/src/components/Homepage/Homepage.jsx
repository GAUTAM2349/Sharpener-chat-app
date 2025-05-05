import { useState } from "react";
import Sidebar from "./Sidebar";
import Chatpage from "../chat/Chatpage";
import { Outlet } from "react-router-dom";
import {
  GroupOwnerProvider,
} from "../../../utils/GroupOwnerContext";



const Homepage = () => {
  const [currGroup, setCurrGroup] = useState(null);

  return (
    <GroupOwnerProvider>
      <div className="flex h-[100%] ">
        <Sidebar currGroup={currGroup} setCurrGroup={setCurrGroup} />
        <Outlet />
        
      </div>
    </GroupOwnerProvider>
  );
};

export default Homepage;
