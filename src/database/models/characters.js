module.exports = (sequelize, type) => {
    return sequelize.define("character", {
        id: {
            type: type.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        name: type.STRING,
        image: type.STRING,
        age: type.INTEGER,
        history: type.TEXT,
        weight: type.FLOAT,
    });
};
