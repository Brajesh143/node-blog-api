const asyncHandlr = require('express-async-handlr')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../model/user")

const signup = asyncHandlr(async(req, res, next) => {
    const { fname, lname, username, password } = req.body
    
    try {
        const checkUserName = await User.findOne({ username })

        let hashedPassword = '';
        if (password !== '' && password.length >= 8) {
            hashedPassword = await bcrypt.hash(password, 12)
        }
        
        const user = await User.create({
            fname,
            lname,
            username,
            password: hashedPassword
        })

        return res.status(201).json({ message: "User has been created successfuly", data: user })

    } catch (err) {
        return next(err)
    }
})

const login = asyncHandlr(async(req, res, next) => {
    const { username, password } = req.body

    const checkUser = await User.findOne({ username })
    if (!checkUser) {
        return res.status(404).json("Username not exist!")
    }

    const checkCredential = await bcrypt.compare(password, checkUser.password)
    if (!checkCredential) {
        return res.status(401).json("Invalid credential!")
    }

    const token = jwt.sign(
        {
            username: checkUser.username,
            userId: checkUser._id.toString()
        },
        'somesupersecretsecret',
        {expiresIn: '1h' }
    )

    checkUser.token = token;
    await checkUser.save();

    return res.status(200).json({
        message: "Login successful",
        token: token,
        data: checkUser
    })
})

const userProfile = asyncHandlr(async(req, res, next) => {
    //
})

const userUpdate = asyncHandlr(async(req, res, next) => {
    //
})

const logout = asyncHandlr(async(req, res, next) => {
    //
})

module.exports = { signup, login, userProfile, userUpdate, logout }