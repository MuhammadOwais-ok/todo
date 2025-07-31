const express = require("express")
const { getAllUsers, getAllTodos, deleteUser } = require("../controllers/admin.controller")
const adminMiddleware = require("../middleware/adminMiddleware")


const router = express.Router()



router.get("/get-All-Users",adminMiddleware,getAllUsers)
router.get("/get-All-Todos",adminMiddleware ,getAllTodos)
router.delete("/deleteUser/:id",adminMiddleware,deleteUser)







module.exports=router
