const express = require("express")
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});
const product = require("./models/productModel.js")
const sequelize = require("./dbConnection.js")
const cors = require("cors")
const bodyParser = require("body-parser")
const multer = require("multer")
const videoModule = require("./modules/videoModule.js")
const userModule = require("./modules/userModule.js")
const adminModule = require("./modules/adminModule")
require("dotenv").config()

const corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({ dest: "./uploadedFiles" }).any())
app.use("/video", videoModule)
app.use("/user", userModule)
app.use("/admin", adminModule)

io.on("connection", function (socket) {
    socket.on("message", function (msg) {
        console.log(msg)
        let rooms = Array.from(socket.rooms)
        socket.to(rooms[1]).emit("reply", msg)
        //socket.rooms returns data in Set object format
        //rooms[1] has room of socket and room[0] has socket id        
    })
    socket.on("createRoom", function (roomNo) {
        console.log(roomNo)
        if (!io.sockets.adapter.rooms.get(roomNo)) {
            socket.join(roomNo)
        }
        else {
            socket.emit("error", "Room already existed.Please choose another one")
        }
        //io.sockets.adapter.rooms returns data in Map object format        
    })
    socket.on("joinRoom", function (roomNo) {
        if (io.sockets.adapter.rooms.get(roomNo)) {
            socket.join(roomNo)
        }
        else {
            socket.emit("error", "Room doesn't exist.Please enter a valid room number")
        }
        //io.sockets.adapter.rooms returns data in Map object format        
    })
})

httpServer.listen(8080, async function () {
    console.log("backend running")
    try {

        await sequelize.sync()
        console.log(sequelize.models)
    }
    catch (err) {
        console.log(err)
    }
})
