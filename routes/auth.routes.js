const express = require("express")
const router = express.Router()
const { login, signUp, forgotPassword, verifyOtp, newPassword } = require('../controllers/auth.controller')





router.post("/login",login)

router.post("/signUp" ,signUp)

router.post("/forgotPassword",forgotPassword)

router.post("/verifyOtp", verifyOtp)

router.post("/newPassword",newPassword)










module.exports = router;