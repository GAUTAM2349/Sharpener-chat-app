import { createContext } from "react";

const UserContext = createContext({
  user: { id: 0 },
  setUser: () => {}, 
});

export default UserContext;
