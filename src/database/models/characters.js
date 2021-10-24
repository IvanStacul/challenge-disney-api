module.exports = (sequelize, type) => {
    return sequelize.define("character", {
        id: {
            type: type.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        image: {
            type: type.STRING,
            allowNull: false,
        },
        age: type.INTEGER,
        history: type.TEXT,
        weight: type.FLOAT,
    });
};
