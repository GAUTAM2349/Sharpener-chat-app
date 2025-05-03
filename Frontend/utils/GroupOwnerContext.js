import { createContext, useEffect, useState } from "react";


export const GroupOwnerContext = createContext();

export const GroupOwnerProvider = ({children}) => {

    const [groupOwner, setGroupOwner] = useState(null);

    return (

        <GroupOwnerContext.Provider value={ { groupOwner, setGroupOwner }} >
            {children}
        </GroupOwnerContext.Provider>
        
    )
    
}

