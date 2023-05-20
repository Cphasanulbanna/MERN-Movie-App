import React from "react";

//css
import "./landing-page.css";

//packages
import { Route, Routes } from "react-router-dom";

//components
import Header from "../header/Header";
import Movies from "../movies/Movies";
import Login from "../login-page/Login";
import Signup from "../signup/Signup";
import ForgetPassword from "../forget-password/ForgetPassword";

//protected routes
import PrivateRoute from "../routes/PrivateRoute";
import ProtectedRouteAfterLogin from "../routes/ProtectedRouteAfterLogin";

function LandingPage() {
    return (
        <>
            <section id="landing-page">
                <Header />
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route
                            path="/"
                            element={<Movies />}
                        />
                    </Route>
                    <Route element={<ProtectedRouteAfterLogin />}>
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                        <Route
                            path="/signup"
                            element={<Signup />}
                        />
                        <Route
                            path="/reset-password"
                            element={<ForgetPassword />}
                        />
                    </Route>
                </Routes>
            </section>
        </>
    );
}

export default LandingPage;
