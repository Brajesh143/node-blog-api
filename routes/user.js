const express = require('express')
const router = express.Router()

const userController = require("../controller/user")
const tokenValidate = require('../middleware/tokenValidator')

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/user-profile', tokenValidate, userController.userProfile)
router.post('/user-update', tokenValidate, userController.userUpdate)
router.post('/logout', tokenValidate, userController.logout)


module.exports = router