import { createContext } from "react";


const UserContext = createContext({
    user : {
        id : 1
    }
})

export default UserContext;