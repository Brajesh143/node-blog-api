const express = require('express')
const router = express.Router()

const blogController = require('../controller/blog')
const tokenValidator = require('../middleware/tokenValidator')

router.get('/', blogController.getBlogs)

router.post('/create', tokenValidator, blogController.createBlog)

router.get('/my-blog', tokenValidator, blogController.myBlogs)

router.put('/:id', tokenValidator, blogController.updateBlog)

router.delete('/:id', tokenValidator, blogController.deleteBlog)

module.exports = router