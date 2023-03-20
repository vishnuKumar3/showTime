const express = require("express")
const app = express()
const product = require("./models/productModel.js")
const sequelize = require("./dbConnection.js")
const cors = require("cors")
const bodyParser = require("body-parser")
const multer = require("multer")
const videoModule = require("./modules/videoModule.js")
require("dotenv").config()

const corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({ dest: "./uploadedFiles" }).any())
app.use("/video", videoModule)


app.listen(8080, async function () {
    console.log("backend running")
    try {

        await sequelize.sync()
        console.log(sequelize.models)
    }
    catch (err) {
        console.log(err)
    }
})
