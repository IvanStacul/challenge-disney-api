const { db, Sequelize } = require("./db");

// models
const MovieModel = require("../models/movies");
const CharacterModel = require("../models/characters");
const GenreModel = require("../models/genres");

const Movie = MovieModel(db, Sequelize);
const Character = CharacterModel(db, Sequelize);
const Genre = GenreModel(db, Sequelize);

// db.sync({ force: false }).then(() => {
//     console.log("All models were synchronized successfully");
// });

module.exports = {
    Movie,
    Character,
    Genre,
};
