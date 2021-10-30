const router = require("express").Router();
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Character, Movie, Genre } = require("../../database/config/tables");
const characters = require("../../database/models/characters");

router.get("/", async (req, res) => {
    let query = req.query;
    let response;

    if (query.name) {
        response = await Character.findAll({
            where: {
                name: {
                    [Op.like]: `%${query.name}%`,
                },
            },
            attributes: ["name", "image"],
        });
    } else if (query.age) {
        response = await Character.findAll({
            where: {
                age: query.age,
            },
            attributes: ["name", "image"],
        });
    } else if (query.weight) {
        response = await Character.findAll({
            where: {
                weight: query.weight,
            },
            attributes: ["name", "image"],
        });
    } else if (query.movies) {
        response = await Character.findAll({
            attributes: ["name", "image"],
            include: [
                {
                    model: Movie,
                    as: "movies",
                    where: {
                        id: query.movies,
                    },
                    attributes: ["image", "title"],

                    include: [
                        {
                            model: Genre,
                            attributes: ["name"],
                        },
                    ],
                },
            ],
        });
    } else {
        response = await Character.findAll({
            attributes: ["name", "image"],
        });
    }

    res.status(200).json({
        status: "success",
        data: response,
        message: "",
    });
});

router.get("/:characterId/detail", async (req, res) => {
    let Characters = await Character.findByPk(req.params.characterId, {
        include: [
            {
                model: Movie,
                as: "movies",
                attributes: ["title", "image", "releaseDate", "rating"],
                include: [
                    {
                        model: Genre,
                        attributes: ["name"],
                    },
                ],
                through: { attributes: [] },
            },
        ],
    });
    res.status(200).json({
        status: "success",
        data: Characters,
        message: "",
    });
});

router.post("/", async (req, res) => {
    const { image, name, age, weight, history, movieId } = req.body;
    const character = await Character.create({
        image,
        name,
        age,
        weight,
        history,
    });
    if (movieId) {
        character.addMovie([movieId]);
    }
    res.status(201).json({
        status: "success",
        data: character,
        message: "Successfully created resource",
    });
});

router.put("/:characterId", async (req, res) => {
    let characterId = req.params.characterId;
    const { image, name, age, weight, history, movieId } = req.body;
    let character = Character.findByPk(characterId);
    await Character.update(
        { name, image, age, weight, history },
        { where: { id: characterId } }
    );
    console.log("Resu");
    console.log(s);
    if (movieId) {
        character.addMovies([movieId]);
    }
    res.status(200).json({
        status: "success",
        data: await Character.findOne({
            where: { id: characterId },
        }),
        message: `Successfully updated resource with id ${characterId}`,
    });
});

router.delete("/:characterId", async (req, res) => {
    await Character.destroy({
        where: { id: req.params.characterId },
    });
    res.status(204).send();
});

module.exports = router;
