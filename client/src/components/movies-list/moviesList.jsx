import React from "react";

//css;
import "./movies-list.css";

//custom hooks
import { useMovies } from "../../context/MovieContext";
import { useMode } from "../../context/ModeContext";

function MoviesList() {
    //fetching movies from movie context
    const { movies } = useMovies();
    const { whiteMode } = useMode();

    return (
        <div className={`movie-list-box `}>
            {movies?.map((movie) => (
                <div
                    key={movie?.id}
                    className={`movie ${whiteMode && "white-mode"}`}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                        alt="movie-poster"
                    />
                </div>
            ))}
        </div>
    );
}

export default MoviesList;
