
const bcrypt = require("bcrypt")
const User = require("../models/User")
const JWT = require('jsonwebtoken');
const { transporter } = require("../utils/nodemailer");
const nodemailer = require("nodemailer");
const otp = require("otp-generator");
const OTP = require("../models/otps");


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
            { id: createdUser._id, email: createdUser.email, role: createdUser.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );


        await transporter.sendMail({
            to: createdUser.email,
            subject: "Welcome to My Platform",
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <div style="text-align: center;">
        <h2 style="color: #4CAF50;">Welcome to Our Community!</h2>
      </div>
      <p style="font-size: 16px; color: #333;">Hi <strong>${createdUser.firstName} ${createdUser.lastName}</strong>,</p>
      <p style="font-size: 15px; color: #555;">
        We're excited to have you on board. Get ready to explore the features of our platform and make the most of your experience.
      </p>
      <p style="font-size: 15px; color: #555;">If you have any questions, feel free to reach out anytime.</p>
      <div style="margin-top: 30px; text-align: center;">
        <a href="https://your-platform-link.com" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">Visit Dashboard</a>
      </div>
      <p style="margin-top: 40px; font-size: 13px; color: #999; text-align: center;">
        &copy; ${new Date().getFullYear()} My Platform. All rights reserved.
      </p>
    </div>
  `
        });




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
            return response.status(404).json({
                message: "User Not Found"
            })
        }

        const isPasswordIsCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordIsCorrect) {
            return response.status(401).json({
                message: "Invalid Credentials"
            })
        }
        const token = JWT.sign(
            { id: user._id, email: user.email, role: user.role },
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



const forgotPassword = async (request, response) => {
    try {
        const { email } = request.body

        const user = await User.findOne({
            email
        })
        if (!user) {
            return response.status(404).json({
                messgae: "User Not Found"
            })

        }

        const genratedOtp = otp.generate(5, {

            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        })

        const now = new Date()
        const newExpiriDate = new Date(now.getTime() + 5 * 60 * 1000)

        const newOtp = new OTP({
            email: user.email,
            otpCode: genratedOtp,
            expiresAt: newExpiriDate

        })

        await newOtp.save()


        await transporter.sendMail({
            to: user.email,
            subject: "otp ",
            text: `your otp code is ${genratedOtp}`,
           
            
        })



        return response.json({
            message: "otp has been sent"
        })




    } catch (error) {
        return response.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }

}

const verifyOtp = async (request, response) => {
    try {
        const { email, code } = request.body
        const now = new Date()

        const otp = await OTP.findOne({
            email,
            otpCode: code

        })
        if (!otp) {
            return response.status(404).json({
                message: "invalid OTP"
            })

        }



        if (now > otp.expiresAt) {
            return response.status(401).json({
                message: "OTP has expires"
            })

        }

        return response.json({
            message: "You can change your password"
        })






    } catch (error) {
        return response.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })

    }
}

const newPassword = async (request, response) => {
    try {
        const { email, newPassword } = request.body
        const user = await User.findOne({
            email,

        })
        if (!user) {
            return response.status(404).json({
                message: "User Not Found"
            })

        }

        const hashpassword = await bcrypt.hash(newPassword, 10)

        user.password = hashpassword;

        user.save()

        return response.status(201).json({
            message: "Password has been Successfully changed"
        })

    } catch (error) {
        return response.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })

    }
}




module.exports = {
    login,
    signUp,
    forgotPassword,
    verifyOtp,
    newPassword
}
