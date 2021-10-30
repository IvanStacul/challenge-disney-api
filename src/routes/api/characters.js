const router = require("express").Router();
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Character } = require("../../database/config/tables");

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
        responseCharacter = await Character.findAll({
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
        responseCharacter = await Character.findAll({
            attributes: ["name", "image"],
            include: [
                {
                    model: Movie,
                    through: {
                        attributes: [],
                    },
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

router.post("/", async (req, res) => {
    const character = await Character.create(req.body);
    res.status(201).json({
        status: "success",
        data: character,
        message: "Successfully created resource",
    });
});

router.put("/:characterId", async (req, res) => {
    let characterId = req.params.characterId
    await Character.update(req.body, {
        where: { id: characterId },
    });
    res.status(200).json({
        status: "success",
        data: await Character.findOne({
            where: { id: characterId },
        }),
        message: `Successfully updated resource with id ${characterId}`
    });
});

router.delete("/:characterId", async (req, res) => {
    await Character.destroy({
        where: { id: req.params.characterId },
    });
    res.status(204).send();
});

module.exports = router;
