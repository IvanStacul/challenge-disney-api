const router = require("express").Router();
const middlewares = require("../middlewares/checkToken");

const apiMovieRouter = require("./api/movies");
const apiCharacterRouter = require("./api/characters");
const apiGenreRouter = require("./api/genres");
const apiAuthRouter = require("./api/auth");

router.use("/movies", middlewares.checkToken, apiMovieRouter);
router.use("/characters", middlewares.checkToken, apiCharacterRouter);
router.use("/genres", middlewares.checkToken, apiGenreRouter);
router.use("/auth", apiAuthRouter);

module.exports = router;
