const { DataTypes } = require("sequelize")
const sequelize = require("../dbConnection.js")
const product=sequelize.define("product",
    {
        productName: {
            type: DataTypes.TEXT,
            allowNull:false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }
)
module.exports=product