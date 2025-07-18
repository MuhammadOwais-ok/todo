const express = require("express")
const { createUser, updateUser, getUser, deleteUser } = require("../controllers/user.controller")

const router = express.Router()



router.post("/createUser",createUser)

router.put("/updateUser",updateUser)


router.get("/getUser",getUser)


router.delete("/deleteUser",deleteUser)








module.exports=router