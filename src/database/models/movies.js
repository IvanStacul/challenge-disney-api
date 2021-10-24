module.exports = (sequelize, type) => {
    return sequelize.define("movie", {
        id: {
            type: type.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: type.STRING,
            allowNull: false,
        },
        image: type.STRING,
        releaseDate: {
            field: "release_date",
            type: type.DATEONLY,
        },
        rating: type.INTEGER,
    });
};
