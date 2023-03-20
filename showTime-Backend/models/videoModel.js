const { DataTypes } = require("sequelize")
const sequelize = require("../dbConnection.js")
const video=sequelize.define("video", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.JSON,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    posterPath: {
        type: DataTypes.STRING,
        allowNull:false
    },
    videoPath: {
        type: DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.STRING,
        allowNull:false
    },
    shortSummary: {
        type: DataTypes.STRING,
        allowNull:false
    }
})
module.exports=video