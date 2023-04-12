const sequelize = require("../dbConnection.js")
const { DataTypes } = require("sequelize")

const admin = sequelize.define("admin", {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = admin

