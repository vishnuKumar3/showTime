const express = require("express")
const router = express.Router()
const video = require("../models/videoModel.js")
const { StatusCodes } = require("http-status-codes")
const fs = require("fs")

module.exports = router

router.post("/addVideo", async function (req, res) {
    let uploadedPosterData = req.body.poster[0].response
    let uploadedVideoData = req.body.video[0].response
    const videoData = {
        "name": req.body.name,
        "genre": req.body.genre,
        "category": req.body.category,
        "posterPath": uploadedPosterData["fileName"],
        "videoPath": uploadedVideoData["fileName"],
        "description": req.body.description,
        "shortSummary": req.body.shortSummary
    }
    try {
        const videoInstance = await video.create(videoData)
        if (videoInstance instanceof video) {
            return res.status(StatusCodes.OK).json({ "data": "data added successfully" })
        }
        else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "data": "internal server error" })
        }
    }
    catch (err) {
        return res.status(StatusCodes.PARTIAL_CONTENT).json({ "data": "partial data entered" })
    }

})

router.post("/uploadVideo", function (req, res) {
    /*
      {
        fieldname: 'logo',
        originalname: 'a.mp4',
        encoding: '7bit',
        mimetype: 'video/mp4',
        destination: './uploadedFiles',
        filename: 'bac4387560853746ace388f14087f4fc',
        path: 'uploadedFiles/bac4387560853746ace388f14087f4fc',
        size: 227673
      }
    */
    const type = req.files[0].mimetype.split("/")[0]
    let path = "";
    if (type == "video") {
        path = process.env.VIDEO_UPLOAD_LOCATION
    }
    else {
        path = process.env.POSTER_UPLOAD_LOCATION
    }
    let filename = new Date().getTime() + "." + req.files[0].mimetype.split("/")[1]
    fs.rename("./" + req.files[0].path, path + filename, function (err) {
        if (err) {
            console.log(err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "data": "file upload failed" })
        }
    })
    return res.status(StatusCodes.OK).json({ "fileName": filename })
})

router.get("/getAllVideos", async function (req, res) {
    res.status(StatusCodes.OK).json(await video.findAll())
})