module.exports = (sequelize, type) => {
    return sequelize.define("genre", {
        id: {
            type: type.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        image: type.STRING,
    });
};
