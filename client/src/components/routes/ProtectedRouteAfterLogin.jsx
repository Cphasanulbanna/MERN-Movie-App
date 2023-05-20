import React from "react";

//packages
import { Navigate, Outlet } from "react-router-dom";

//custom hook
import useLocalStorage from "../../hooks/useLocalStorage";

function ProtectedRouteAfterLogin() {
    const { getlocalStorage } = useLocalStorage();

    const userData = getlocalStorage("user_data");
    return userData ? <Navigate to="/" /> : <Outlet />;
}

export default ProtectedRouteAfterLogin;
