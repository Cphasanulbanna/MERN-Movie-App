import { createContext, useContext, useEffect, useState } from "react";

//custom hook
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //states
    const [auth, setAuth] = useState(false);

    const { getlocalStorage } = useLocalStorage();

    //checking if userdata[login credentials] exists in localStorage
    useEffect(() => {
        const userData = getlocalStorage("user_data");
        if (userData) {
            setAuth(true);
        }
    }, []);

    return <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>;
};

//auth hook
export const useAuth = () => {
    return useContext(AuthContext);
};
