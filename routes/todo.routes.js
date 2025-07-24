const express = require("express")
const { createTodo,  updateTodo, deleteTodo, getallTodo } = require("../controllers/todo.controller")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()


router.post("/create", authMiddleware, createTodo)
router.get("/gettodo/:id", authMiddleware, getallTodo)
router.put("/updateTodo/:id", authMiddleware, updateTodo)
router.delete("/delete/:id", authMiddleware, deleteTodo)











module.exports = router

