module.exports = (sequelize, type) => {
    return sequelize.define("user", {
        id: {
            type: type.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: type.STRING,
            allowNull: false,
        },
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: type.STRING,
            allowNull: false,
        },
    });
};
