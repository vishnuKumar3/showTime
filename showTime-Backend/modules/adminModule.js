const admin = require("../models/adminModel.js");
const router = require("express").Router()
var bcrypt = require("bcrypt")
const { StatusCodes } = require("http-status-codes")

module.exports = router

async function adminExisted(email) {
    const adminData = JSON.parse(JSON.stringify(await admin.findOne({ where: { email: email } })))
    if (adminData == null) {
        return false
    }
    else {
        return adminData
    }
}

router.post("/addAdmin", async function (req, res) {
    try {
        const password = bcrypt.hashSync(req.body.password, 10)
        const data = {
            "userName": req.body.userName,
            "email": req.body.email,
            "password": password,
            "role": req.body.role
        }
        const adminData = await admin.create(data)
        if (adminData instanceof admin) {
            return res.status(StatusCodes.OK).json({ "data": "admin added successfully" })
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

router.post("/verifyAdmin", async function (req, res) {
    const adminData = await adminExisted(req.body.email)
    if (!adminData) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "data": "admin unauthorized" })
    }
    else if (bcrypt.compareSync(req.body.password, adminData.password)) {
        return res.status(StatusCodes.OK).json({ "data": "admin verified successfully", "id": adminData["id"], "role": adminData["role"] })
    }
    else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ "data": "admin unauthorized" })
    }

})