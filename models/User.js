const { Schema, default: mongoose } = require("mongoose");



const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    createAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        Enumerator: ["user", "admin"],

    }






})


const User = mongoose.model("User", userSchema)


module.exports = User;// models/User.js