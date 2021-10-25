const router = require("express").Router();

const { Genre } = require("../../database/config/tables");

router.get("/", async (req, res) => {
    const genres = await Genre.findAll();
    res.json(genres);
});

router.post("/", async (req, res) => {
    const movie = await Genre.create(req.body);
    res.json(movie);
});

router.put("/:genreId", async (req, res) => {
    await Genre.update(req.body, {
        where: { id: req.params.genreId },
    });
    res.json({ success: "Genre updated." });
});

router.delete("/:genreId", async (req, res) => {
    await Genre.destroy({
        where: { id: req.params.genreId },
    });
    res.json({ success: "Genre deleted." });
});

module.exports = router;
