import { createContext, useContext, useEffect, useState } from "react";

//packages
import axios from "axios";

//custom-hook
import useDebounce from "../hooks/useDebounce";

//creating MovieContext
export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    //states
    const [searchedWord, setSearchedWord] = useState("");
    const [movies, setMovies] = useState([]);

    //fetching movies
    const fetchMovies = async () => {
        try {
            const response = await axios.get(`http://localhost:3005/api/movies`, {
                params: {
                    movieName: searchedWord,
                },
            });
            setMovies(
                response.data.results.filter((movie) => {
                    return movie?.poster_path !== null;
                })
            );
        } catch (error) {
            console.log(error);
        }
    };

    //debounce hook
    useDebounce(fetchMovies, [searchedWord]);

    return (
        <MovieContext.Provider value={{ movies, searchedWord, setSearchedWord }}>
            {children}
        </MovieContext.Provider>
    );
};

//custom hook
export const useMovies = () => {
    return useContext(MovieContext);
};
