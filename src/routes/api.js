const router = require("express").Router();

const apiMovieRouter = require("./api/movies");
const apiCharacterRouter = require("./api/characters");

router.use("/movies", apiMovieRouter);
router.use("/characters", apiCharacterRouter);

module.exports = router;
