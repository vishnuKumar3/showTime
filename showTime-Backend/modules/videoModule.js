const express = require("express")
const router = express.Router()
const video = require("../models/videoModel.js")
const { StatusCodes} =require("http-status-codes")

module.exports = router

router.post("/addVideo", async function (req, res) {
    try {
        const videoInstance = await video.create(req.body)
        if (videoInstance instanceof video) {
            return res.status(StatusCodes.OK).json({ "data": "data added successfully" })
        }
    }
    catch(err) {
        return res.status(StatusCodes.PARTIAL_CONTENT).json({"data":"partial data entered"})
    }

})

router.get("/getAllVideos", async function (req, res) {
    res.status(StatusCodes.OK).json(await video.findAll())
})