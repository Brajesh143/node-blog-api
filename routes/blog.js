const express = require('express')
const router = express.Router()

const blogController = require('../controller/blog')
const tokenValidator = require('../middleware/tokenValidator')

router.get('/', blogController.getBlogs)

router.post('/create-blog', tokenValidator, blogController.createBlog)

module.exports = router