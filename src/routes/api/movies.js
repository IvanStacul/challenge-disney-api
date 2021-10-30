const router = require("express").Router();
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Movie } = require("../../database/config/tables");

router.get("/", async (req, res) => {
    let movies;
    let query = req.query;

    if (query.title) {
        let title = query.title;

        movies = await Movie.findAll({
            where: {
                title: {
                    [Op.like]: `%${title}%`,
                },
            },
        });
    } else if (query.genre) {
        movies = await Movie.findAll({
            where: {
                GenreId: query.genre,
            },
        });
    } else if (query.order) {
        movies = await Movie.findAll({
            order: [["releaseDate", query.order]],
        });
    } else {
        movies = await Movie.findAll({
            attributes: ["title", "image", "releaseDate"],
        });
    }
    res.status(200).json(movies);
});

router.post("/", async (req, res) => {
    const movie = await Movie.create(req.body);
    res.status(201).json({
        status: "success",
        data: movie,
        message: "Successfully created resource",
    });
});

router.put("/:movieId", async (req, res) => {
    let movieId = req.params.movieId;
    await Movie.update(req.body, {
        where: { id: movieId },
    });
    res.status(200).json({
        status: "success",
        data: await Movie.findOne({
            where: { id: movieId },
        }),
        message: `Successfully updated resource with id ${movieId}`
    });
});

router.delete("/:movieId", async (req, res) => {
    await Movie.destroy({
        where: { id: req.params.movieId },
    });
    res.status(204).send();
});

module.exports = router;
