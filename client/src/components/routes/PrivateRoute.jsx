import React from "react";

//packages
import { Navigate, Outlet } from "react-router-dom";

//custom hooks
import { useAuth } from "../../context/AuthContext";

function PrivateRoute() {
    const { auth } = useAuth();

    return auth ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoute;
