import React from "react";

//css
import "./search-bar.css";

// custom hooks
import { useMovies } from "../../context/MovieContext";
import { useMode } from "../../context/ModeContext";

function SearchBar() {
    const { setSearchedWord } = useMovies();
    const { whiteMode } = useMode();

    //storing search input value
    const handleInputChange = (e) => {
        const { value } = e.target;
        setSearchedWord(value);
    };
    return (
        <div className={`search-container ${whiteMode && "white-mode"}`}>
            <input
                type="text"
                placeholder="search movies...!"
                onChange={handleInputChange}
            />
            <span className="search-icon">
                <img
                    src={require("../../assets/images/search.svg").default}
                    alt="search-icon"
                />
            </span>
        </div>
    );
}

export default SearchBar;
