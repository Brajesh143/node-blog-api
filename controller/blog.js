const asyncHandlr = require('express-async-handlr')
const Blog = require('../model/blog')
const User = require('../model/user')

const getBlogs = asyncHandlr(async(req, res, next) =>{
    try {
        const blogs = await Blog.find().populate("author")

        return res.status(200).json({ message: "Blog lists", data: blogs })
    } catch (err) {
        return next(err)
    }
})

const createBlog = asyncHandlr(async(req, res, next) => {
    const user_id = req.userId
    const { title, category, description } = req.body

    try {
        const addBlog = await Blog.create({
            title,
            category,
            description,
            author: user_id
        })

        const user = await User.findOneAndUpdate({_id: user_id}, {$push: {blogs: addBlog}})

        return res.status(201).json({ message: "Blog has created successfuly!"})

    } catch (err) {
        return next(err)
    }
})

const myBlogs = asyncHandlr(async(req, res, next) =>{
    const user_id = req.userId
    try {
        const blogs = await Blog.find({ author: user_id }).populate("author")

        return res.status(200).json({ message: "My Blog lists", data: blogs })
    } catch (err) {
        return next(err)
    }
})

module.exports = { getBlogs, createBlog, myBlogs }