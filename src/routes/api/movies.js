const router = require("express").Router();

const { Movie } = require("../../database/config/tables");

router.get("/", async (req, res) => {
    const movies = await Movie.findAll({
        attributes: ["title", "image", "releaseDate"],
    });
    res.json(movies);
});

router.post("/", async (req, res) => {
    const movie = await Movie.create(req.body);
    res.json(movie);
});

router.put("/:movieId", async (req, res) => {
    await Movie.update(req.body, {
        where: { id: req.params.movieId },
    });
    res.json({success: "Movie updated."});
});

router.delete("/:movieId", async (req, res) => {
    await Movie.destroy({
        where: { id: req.params.movieId },
    });
    res.json({success: "Movie deleted."});
});

module.exports = router;
