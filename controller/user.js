const asyncHandlr = require('express-async-handlr')

const signup = asyncHandlr(async(req, res, next) => {
    //
})

const login = asyncHandlr(async(req, res, next) => {
    //
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