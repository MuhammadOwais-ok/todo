
const bcrypt = require("bcrypt")
const User = require("../models/User")
const JWT = require('jsonwebtoken');

require("dotenv").config();



const signUp = async (request, response) => {
    try {
        const { firstName, lastName, email, password } = request.body

        const isalreadyInOurDatabase = await User.findOne({
            email
        })

        if (isalreadyInOurDatabase) {
            return response.status(409).json({
                message: "user is already in Our data base"
            })
        }
        const hashpassword = await bcrypt.hash(password, 10)

        const createdUser = new User({
            firstName,
            lastName,
            email,
            password: hashpassword

        })
        await createdUser.save()

        const token = JWT.sign(
            { id: createdUser._id, email: createdUser.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

        



        const userToReturn = { ...createdUser._doc };
        delete userToReturn.password;


        return response.status(201).json({
            message: "Account has been Created",
            createdUser,
            token
        })




    } catch (error) {
        console.error("signUp Error", error.message);
        return response.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const login = async (request, response) => {

            
    try {

        const { email, password } = request.body
        const user = await User.findOne({ email })


        if (!user) {
            return response.status(401).json({
                message: "Invalid Credeintial"
            })
        }

        const isPasswordIsCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordIsCorrect) {
            return response.status(401).json({
                message: "Invalid Credentials"
            })
        }
        const token = JWT.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d"
            })
        const userToReturn = { ...user._doc };
        delete userToReturn.password;

        return response.status(200).json({
            message: "login Succssefully",
            user: userToReturn,
            token
        })
    }

    catch (error) {
        return response.status(500).json({
            error: error.message
        })

    }
}

module.exports = {
    login,
    signUp
}
