const sequelize = require("../dbConnection.js")
const { DataTypes } = require("sequelize")

const user = sequelize.define("user", {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = user