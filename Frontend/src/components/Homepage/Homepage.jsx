import { useState } from "react";
import Sidebar from "./Sidebar";
import Chatpage from "../chat/Chatpage";
import { Outlet } from "react-router-dom";
import {
  GroupOwnerContext,
  GroupOwnerProvider,
} from "../../../utils/GroupOwnerContext";

// const Homepage = () => {

//     const[currGroup , setCurrGroup] = useState(null);

//   return (
//     <>
//       <div className="flex flex-grow-1">
//         <Sidebar setCurrGroup={setCurrGroup} />
//         <Chatpage  currGroup={currGroup}/>
//       </div>
//     </>
//   );
// };

// export default Homepage;

const Homepage = () => {
  const [currGroup, setCurrGroup] = useState(null);

  return (
    <GroupOwnerProvider>
      <div className="flex h-screen">
        <Sidebar currGroup={currGroup} setCurrGroup={setCurrGroup} />
        <Outlet />
      </div>
    </GroupOwnerProvider>
  );
};

export default Homepage;
