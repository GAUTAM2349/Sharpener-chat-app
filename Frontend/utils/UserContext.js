// import { createContext } from "react";


// const UserContext = createContext({
//     user : {
//         id : 0
//     }
// })

// export default UserContext;


import { createContext } from "react";

const UserContext = createContext({
  user: { id: 0 },
  setUser: () => {}, // default placeholder function
});

export default UserContext;
