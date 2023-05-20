import React from "react";

//css
import "./header.css";

//packages
import { useNavigate } from "react-router-dom";

//custom hooks
import { useMode } from "../../context/ModeContext";
import useLocalStorage from "../../hooks/useLocalStorage";

// icons
import darkmode from "../../assets/images/darkmode.png";
import whitemode from "../../assets/images/whitemode.png";
import profileBlack from "../../assets/images/profile-black.png";
import profileWhite from "../../assets/images/profile-white.png";

function Header() {
    const { whiteMode, setWhiteMode } = useMode();

    const navigate = useNavigate();

    //switchinf DARK/LIGHT mode
    const toggleMode = () => {
        setWhiteMode((prev) => !prev);
    };

    //logout function
    const logout = () => {
        localStorage.removeItem("user_data");
        navigate("/login");
    };

    //user-data from local storage
    const { getlocalStorage } = useLocalStorage();
    const userData = getlocalStorage("user_data");

    return (
        <header className={whiteMode && "white-mode"}>
            <div className="logo-box">
                <div className="logo-image">
                    <img
                        src={require("../../assets/images/logo.svg").default}
                        alt="logo"
                    />
                </div>
                <h1 className="logo-text">DebugMedia</h1>
            </div>

            <div className="right">
                <div
                    className={`mode ${whiteMode && "white-mode"}`}
                    onClick={toggleMode}
                >
                    <img
                        src={whiteMode ? whitemode : darkmode}
                        alt="dark/white-moode"
                    />
                </div>
                {userData && (
                    <>
                        <button
                            onClick={logout}
                            className={`logout ${whiteMode && "white-mode"}`}
                        >
                            <span className={`text ${whiteMode && "white-mode"}`}>Logout</span>
                            <span className="profile">
                                <img
                                    src={whiteMode ? profileBlack : profileWhite}
                                    alt="profile"
                                />
                            </span>
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
