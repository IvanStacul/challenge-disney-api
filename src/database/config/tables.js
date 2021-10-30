const { db, Sequelize } = require("./db");

// models
const MovieModel = require("../models/movies");
const CharacterModel = require("../models/characters");
const GenreModel = require("../models/genres");
const UserModel = require("../models/user");

const Movie = MovieModel(db, Sequelize);
const Character = CharacterModel(db, Sequelize);
const Genre = GenreModel(db, Sequelize);
const User = UserModel(db, Sequelize);

//relations
Movie.belongsToMany(Character, {through: 'movie_character', as: "characters"});
Character.belongsToMany(Movie, {through: 'movie_character', as: "movies"});
Movie.belongsTo(Genre);
Genre.hasMany(Movie);

// db.sync({ force: false }).then(() => {
//     console.log("All models were synchronized successfully");
// });

module.exports = {
    Movie,
    Character,
    Genre,
    User
};
