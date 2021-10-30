const router = require("express").Router();

const { Genre } = require("../../database/config/tables");

router.get("/", async (req, res) => {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
});

router.post("/", async (req, res) => {
    const genre = await Genre.create(req.body);
    res.status(201).json({
        status: "success",
        data: genre,
        message: "Successfully created resource",
    });
});

router.put("/:genreId", async (req, res) => {
    let genreId = req.params.genreId
    await Genre.update(req.body, {
        where: { id: genreId },
    });
    res.status(200).json({
        status: "success",
        data: await Genre.findOne({
            where: { id: genreId },
        }),
        message: `Successfully updated resource with id ${genreId}`
    });
});

router.delete("/:genreId", async (req, res) => {
    await Genre.destroy({
        where: { id: req.params.genreId },
    });
    res.status(204).send();
});

module.exports = router;
