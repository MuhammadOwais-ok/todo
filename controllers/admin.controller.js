const User = require("../models/User")
const Todo = require("../models/Todos")
const JWT = require("jsonwebtoken")





const getAllUsers = async (request, response) => {
    try {
        const { query } = request;

        const page = +query.page || 1;
        const limit = +query.limit || 10;
        const searchValue = query.searchValue;

        const skip = (page - 1) * limit;


        const searchQuery = {
            role: "user",
        };

        if (searchValue) {
            searchQuery.$or = [
                { firstName: { $regex: searchValue, $options: "i" } },
                { lastName: { $regex: searchValue, $options: "i" } },
                { email: { $regex: searchValue, $options: "i" } }
            ];
        }

        const users = await User.find(searchQuery)
            .skip(skip)
            .limit(limit)

        const totalUsers = await User.countDocuments(searchQuery)

        return response.status(201).json({
            message: "all User is Fetched successfully",
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            users

        })


    } catch (error) {
        console.log("🚀 ~ getAllUsers ~ error:", error)
        response.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error
        });

    }
}




const getAllTodos = async (request, response) => {


    try {

        const todos = await Todo.find()

        return response.status(201).json({
            message: "All Todos are Fetched",
            todos
        })

    } catch (error) {

        response.status(500).json({
            success: false,
            message: "Failed to fetch todos",
            error
        });


    }

}


const deleteUser = async (request, response) => {
    try {

        const id = request.params.id

        const user = await User.findOne({
            _id: id,
            role: "user"
        })
        if (!user) {
            return response.status(401).json({
                message: "User Not Found"
            })

        }

        await User.findByIdAndDelete(user.id)


        return response.status(201).json({
            message: "deleted Successfully",
        })
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        });

    }








}


module.exports = {
    getAllUsers,
    getAllTodos,
    deleteUser
}