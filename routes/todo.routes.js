const express = require ("express")
const { createTodo, getTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller")
const router = express.Router()


router.post("/create",createTodo)
router.get("/gettodo",getTodo)
router.put("/update",updateTodo)
router.delete("/delete", deleteTodo)











module.exports = router

