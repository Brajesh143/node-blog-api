const express = require('express')
const router = express.Router()

const userController = require("../controller/user")
const tokenValidator = require('../middleware/tokenValidator')

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/user-profile', tokenValidator, userController.userProfile)
router.put('/user-update', tokenValidator, userController.userUpdate)
router.post('/logout', tokenValidator, userController.logout)

module.exports = router