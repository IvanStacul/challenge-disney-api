const { db, Sequelize } = require("./db");

// models
const MovieModel = require("../models/movies");

const Movie = MovieModel(db, Sequelize);

// db.sync({ force: false }).then(() => {
//     console.log("All models were synchronized successfully");
// });

module.exports = {
    Movie,
};
