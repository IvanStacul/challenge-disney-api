const router = require("express").Router();

const { Character } = require("../../database/config/tables");

router.get("/", async (req, res) => {
    const movies = await Character.findAll();
    res.json(movies);
});

router.post("/", async (req, res) => {
    const movie = await Character.create(req.body);
    res.json(movie);
});

router.put("/:characterId", async (req, res) => {
    await Character.update(req.body, {
        where: { id: req.params.characterId },
    });
    res.json({ success: "Character updated." });
});

router.delete("/:characterId", async (req, res) => {
    await Character.destroy({
        where: { id: req.params.characterId },
    });
    res.json({ success: "Character deleted." });
});

module.exports = router;
