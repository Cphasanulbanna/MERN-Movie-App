//MODULES
const express = require("express");
const cors = require("cors");
const moviesList = require("./movies.json");

const app = express();
const PORT = 3005;

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//FILTER MOVIES API
app.get("/api/movies", (req, res) => {
    const { movieName } = req.query;
    let filteredMovies = [];
    if (movieName) {
        filteredMovies = moviesList.filter((movie) =>
            movie.title.toLowerCase().includes(movieName.toLowerCase())
        );
    } else {
        filteredMovies = moviesList;
    }

    res.json({
        results: filteredMovies,
    });
});

//ADD MOVIE API
app.post("/api/movies", (req, res) => {
    const { movieName } = req.body;

    moviesList.push({
        id: Date.now(),
        title: movieName,
        poster_path: "",
    });

    res.json({
        results: moviesList,
    });
});

//DELETE MOVIE API
app.delete("/api/movies", (req, res) => {
    const { movieName } = req.body;

    //filtering movies
    const filteredMovieList = moviesList.filter(
        (movie) => movie.title.toLowerCase() !== movieName.toLowerCase()
    );

    //sending filtered movies
    res.json({
        results: filteredMovieList,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});
