const express = require("express")
const { createTodo, getTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()


router.post("/create", authMiddleware, createTodo)
router.get("/gettodo", getTodo)
router.put("/update", updateTodo)
router.delete("/delete", deleteTodo)











module.exports = router

