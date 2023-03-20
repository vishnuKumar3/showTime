const { Sequelize } = require("sequelize")
const sequelize = new Sequelize("showTime", "root", "", { "host": "localhost", "dialect": "mysql" })
try {
    async function initialize() {
        await sequelize.authenticate()
    }
    initialize()
    console.log("Database connection successful")
}
catch (err) {
    if (err) {
        console.log("Database Connection Failed:"+err)
    }
}
module.exports = sequelize