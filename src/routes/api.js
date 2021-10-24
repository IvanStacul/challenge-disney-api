const router = require("express").Router();

const apiMovieRouter = require("./api/movies");
const apiCharacterRouter = require("./api/characters");
const apiAuthRouter = require("./api/auth");

router.use("/movies", apiMovieRouter);
router.use("/characters", apiCharacterRouter);
router.use("/auth", apiAuthRouter);

module.exports = router;
