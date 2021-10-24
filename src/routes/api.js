const router = require("express").Router();

const apiMovieRouter = require("./api/movies");

router.use("/movies", apiMovieRouter);

module.exports = router;
