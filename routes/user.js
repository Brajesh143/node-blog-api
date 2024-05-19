const express = require('express')
const router = express.Router()

const userController = require("../controller/user")

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/user-profile', userController.userProfile)
router.post('/user-update', userController.userUpdate)
router.post('/logout', userController.logout)


module.exports = router