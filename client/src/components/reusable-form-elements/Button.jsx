import React from "react";

//custom hooks
import { useMode } from "../../context/ModeContext";

function Button({ text }) {
    const { whiteMode } = useMode();
    return (
        <button
            className={whiteMode && "white-mode"}
            type="submit"
        >
            {text}
        </button>
    );
}

export default Button;
