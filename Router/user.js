const express = require("express")
const router = express.Router()

const {
    login,
    signup,
} = require("../routes/auth")

router.post("/login", login)
router.post("/signup", signup)

module.exports = router