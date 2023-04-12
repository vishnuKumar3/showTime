const user = require("../models/userModel.js")
const express = require("express")
const router = express.Router()
const { StatusCodes } = require("http-status-codes")
const bcrypt = require("bcrypt")

module.exports = router

async function userExisted(email) {
    const userData = JSON.parse(JSON.stringify(await user.findOne({ where: { email: email } })))
    if (userData == null) {
        return false
    }
    else {
        return userData
    }
}

router.post("/addUser", async function (req, res) {
    try {
        const data = req.body
        data.password = bcrypt.hashSync(data.password, 10)
        const userData = await user.create(data)
        if (userData instanceof user) {
            return res.status(StatusCodes.OK).json({ "data": "user added successfully" })
        }
        else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "data": "internal server error" })
        }

    }
    catch (err) {
        return res.status(StatusCodes.PARTIAL_CONTENT).json({
            "data": "please enter all the required data"
        })
    }
})

router.post("/verifyUser", async function (req, res) {
    const userData = await userExisted(req.body.email)
    if (!userData) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "data": "user unauthorized" })
    }
    else if (bcrypt.compareSync(req.body.password, userData.password)) {
        return res.status(StatusCodes.OK).json({ "data": "user verified successfully", "id": userData["id"], "role": "USER" })
    }
    else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ "data": "user unauthorized" })
    }

})
