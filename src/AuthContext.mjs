import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider({children}){

    const [currentUser, setCurrentUser] = useState(null)

    const updateUser = (data)=>{
        console.log(`updating user to ${data}`);
        setCurrentUser(data)
    }

    const value = {
        currentUser,
        updateUser
    }

    useEffect(()=>{
        console.log(currentUser);
    },[currentUser])

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}