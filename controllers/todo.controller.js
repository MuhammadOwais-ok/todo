const User = require("../models/User")
const Todo = require("../models/Todos")
const mongoose = require("mongoose");

const createTodo = async (request, response) => {

    try {
        const { title, description } = request.body


        const user = await User.findById(request.user.id)


        if (!title || !description) {
            return response.status(401).json({
                message: "title and description is required"
            })

        }


        if (!user) {
            return response.status(404).json({
                message: "User not found"

            })
        }

        const newTodo = new Todo({
            title,
            description,
            user: {
                _id: user._id
            }
        })
        const savedTodo = await newTodo.save()

        return response.status(201).json({
            message: "Todo Created Successfully",
            todo: savedTodo
        })

    } catch (error) {
        return response.status(500).json({
            message: " Internal Server error"
        })

    }


}

const updateTodo = async (request, response) => {
    try {
        const id = request.params.id


        const { title, description } = request.body;


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ message: "Invalid Todo ID format" });
        }


        const todo = await Todo.findById(id)
        if (!todo) {
            return response.status(400).json({
                message: "Todo not found",
            })
        }

        const updated = await Todo.findOneAndUpdate(
            { _id: id, user: { _id: request.user.id } },
            { title, description },
            { new: true }
        )

        return response.status(200).json({
            message: "updated todo successfully",
            updated
        })




    } catch (error) {
        return response.status(500).json({
            message: " Internal Server error"
        })

    }





}

const deleteTodo = async (request, response) => {
    try {
        const id = request.params.id


        const userId = request.user.id


        const todo = await Todo.findById(id)

        if (!todo) {
            return response.status(400).json({
                message: "Todo not found",
            })
        }
        const dt = await Todo.findOneAndDelete(
            { _id: id, user: userId },
            // { title, description },
            // { new: true }


        )
        return response.status(201).json({
            message: "todo Deleted",
            dt

        })




    } catch (error) {
        return response.status(500).json({
            error: error.message || "Internal Server Error"
        })

    }







}

const getallTodo = async (request, response) => {


    try {
        const userId = request.user._id

        if (!userId) {
            return response.status(401).json({
                message: "Unauthorized: user not found in token"
            });
        }
        

        const todos = await Todo.find({ user: userId });


        return response.status(201).json({
            message: " All todos ",
            todos
        })



    } catch (error) {
        return response.status(500).json({
            error: error.message || "Internal Server Error"
        })

    }






}

module.exports = {
    createTodo,
    updateTodo,
    deleteTodo,
    getallTodo
}
