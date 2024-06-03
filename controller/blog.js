const asyncHandlr = require('express-async-handlr')
const Blog = require('../model/blog')
const User = require('../model/user')

const getBlogs = asyncHandlr(async(req, res, next) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    try {
        const blogs = await Blog.find().skip(skip).limit(limit).populate("author")
        const totalBlogs = await Blog.countDocuments();

        return res.status(200).json({ message: "Blog lists", data: blogs, total: totalBlogs })
    } catch (err) {
        return next(err)
    }
})

const createBlog = asyncHandlr(async(req, res, next) => {
    const user_id = req.userId
    const { title, category, description } = req.body
    const image = req.file;

    try {
        const addBlog = await Blog.create({
            title,
            category,
            description,
            author: user_id
        })

        if (req.file) {
            const imageUrl = `/public/uploads/blogs/${image.filename}`;
            const blogImage = await Blog.updateOne({_id: addBlog._id}, {$set:{image: imageUrl}})
        }

        const user = await User.findOneAndUpdate({_id: user_id}, {$push: {blogs: addBlog}})

        return res.status(201).json({ message: "Blog has created successfuly!"})

    } catch (err) {
        return next(err)
    }
})

const myBlogs = asyncHandlr(async(req, res, next) =>{
    const user_id = req.userId
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    try {
        const blogs = await Blog.find({ author: user_id }).skip(skip).limit(limit).populate("author")
        const totalBlogs = await Blog.countDocuments();

        return res.status(200).json({ message: "My Blog lists", data: blogs, total: totalBlogs })
    } catch (err) {
        return next(err)
    }
})

const updateBlog = asyncHandlr(async(req, res, next) => {
    const user_id = req.userId
    const blog_id = req.params.id
    const { title, category, description } = req.body
    const image = req.file;

    try {
        const blog = await Blog.findById(blog_id)

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }
        
        if (blog.author.toString() !== user_id) {
            return res.status(403).json({ message: "You are not authorised to update" })
        }

        const updateBlog = await Blog.findOneAndUpdate({_id: blog_id}, { title, category, description }, { upsert: true, new: true })

        if (req.file) {
            const imageUrl = `/public/uploads/blogs/${image.filename}`;
            const blogImage = await Blog.updateOne({_id: blog_id}, {$set:{image: imageUrl}})
        }

        return res.status(200).json({ message: "Blog has been updated successfuly!" })

    } catch (err) {
        return next(err)
    }
})

const deleteBlog = asyncHandlr(async(req, res, next) => {
    const user_id = req.userId
    const blog_id = req.params.id

    try {
        const blog = await Blog.findById(blog_id)

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }
        
        if (blog.author.toString() !== user_id) {
            return res.status(403).json({ message: "You are not authorised to delete" })
        }

        const deleteBlogFromUser = await User.findOneAndUpdate({_id: user_id}, {$pull: {blogs: blog_id}}, {upsert: true})

        const deleteBlog = await Blog.findByIdAndDelete(blog_id)

        return res.status(200).json({ message: "Blog has been deleted successfuly!" })

    } catch (err) {
        return next(err)
    }
})

const getBlogDetails = asyncHandlr(async(req, res, next) => {
    const blog_id = req.params.id

    try {
        const blogDetail = await Blog.findOne({ _id: blog_id})

        return res.status(200).json({ message: "Blog details", data: blogDetail })
    } catch (err) {
        return next(err)
    }
})

module.exports = { getBlogs, getBlogDetails, createBlog, myBlogs, updateBlog, deleteBlog }