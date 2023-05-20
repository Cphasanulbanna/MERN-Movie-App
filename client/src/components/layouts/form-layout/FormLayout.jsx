import React from "react";

//css
import "./form-layout.css";

//custom-hook for DARK/WHITE mode
import { useMode } from "../../../context/ModeContext";

export const FormLayout = ({ children }) => {
    const { whiteMode } = useMode();
    return (
        <div className={`login-container ${whiteMode && "white-mode"}`}>
            <div className="content">{children}</div>
        </div>
    );
};
