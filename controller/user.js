const asyncHandlr = require('express-async-handlr')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../model/user")
const Blacklist = require('../model/blacklist')

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

    try {
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
    } catch (err) {
        return next(err)
    }
})

const userProfile = asyncHandlr(async(req, res, next) => {
    const user_id = req.userId

    try {
        const user = await User.findById(user_id)
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        return res.status(200).json({ message: "User data", data: user })

    } catch (err) {
        return next(err)
    }
})

const userUpdate = asyncHandlr(async(req, res, next) => {
    const { fname, lname, username } = req.body
    const user_id = req.userId
    const image = req.file;

    try {
        if (req.file) {
            // const imageUrl = image.path;
            const imageUrl = `/public/uploads/users/${image.filename}`;
            const userUpdateImage = await User.updateOne({_id: user_id}, {$set:{profile_image: imageUrl}})
        }

        const userUpdate = await User.findOneAndUpdate({_id: user_id}, {fname, lname, username}, {upsert: true})

        return res.status(200).json({ message: "User has been updated successfuly" })
    } catch (err) {
        return next(err)
    }

})

const logout = asyncHandlr(async(req, res, next) => {
    const authHeader = req.get('Authorization');

    try {
        const token = authHeader.split(' ')[1];

        const newBlacklist = new Blacklist({
            token: token,
        });

        await newBlacklist.save();

        return res.status(200).json({ message: 'You are logged out!' });

    } catch (err) {
        return next(err)
    }
})

module.exports = { signup, login, userProfile, userUpdate, logout }