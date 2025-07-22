const express = require("express")
const router = express.Router()
const { login, signUp } = require('../controllers/auth.controller')
const authMiddleware = require("../middleware/authMiddleware")



router.post("/login", login)

router.post("/signUp" ,signUp)










module.exports = router;