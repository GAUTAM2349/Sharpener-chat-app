import  { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ id: 0 }); // initially logged out

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

