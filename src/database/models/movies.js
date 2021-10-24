module.exports = (sequelize, type) => {
    return sequelize.define("movie", {
        id: {
            type: type.BIGINT(11),
            primaryKey: true,
            autoIncrement: true,
        },
        title: type.STRING,
        image: type.STRING,
        releaseDate: {
            field: "release_date",
            type: type.DATEONLY,
        },
        rating: type.INTEGER,
    });
};
