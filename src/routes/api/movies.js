const router = require("express").Router();
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Movie, Genre, Character } = require("../../database/config/tables");

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
                genreId: query.genre,
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

router.get("/:movieId/detail", async (req, res) => {
    let movies = await Movie.findByPk(req.params.movieId, {
        include: [
            {
                model: Character,
                as: "characters",
                attributes: ["name", "age", "image"],
                through: { attributes: [] },
            },
        ],
    });
    res.status(200).json({
        status: "success",
        data: movies,
        message: "",
    });
});

router.post("/", async (req, res) => {
    const { title, image, releaseDate, rating, genreId } = req.body;
    const movie = await Movie.create({
        title,
        image,
        releaseDate,
        rating,
        genreId,
    });
    res.status(201).json({
        status: "success",
        data: movie,
        message: "Successfully created resource",
    });
});

router.put("/:movieId", async (req, res) => {
    let movieId = req.params.movieId;
    const { title, image, releaseDate, rating, genreId } = req.body;
    await Movie.update(
        { title, image, releaseDate, rating, genreId },
        { where: { id: movieId } }
    );
    res.status(200).json({
        status: "success",
        data: await Movie.findOne({
            where: { id: movieId },
        }),
        message: `Successfully updated resource with id ${movieId}`,
    });
});

router.delete("/:movieId", async (req, res) => {
    await Movie.destroy({
        where: { id: req.params.movieId },
    });
    res.status(204).send();
});

module.exports = router;
