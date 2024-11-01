const Joi = require('joi')

const PASSWORD_REGEX = new RegExp("^[a-zA-Z0-9@]{3,30}$");

const productSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    // file: Joi.object({
    //     mimetype: Joi.string().valid('image/jpg', 'image/png').required(),
    //     size: Joi.number().max(1048576) // Limit file size to 1 MB
    // }).required() 
})

const signupSchema = Joi.object({
    fname: Joi.string().min(3).max(30).required(),
    lname: Joi.string().min(1).max(30).required(),
    username: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).min(8).max(16).required()
})

const signinSchema = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).min(8).max(16).required()
})

module.exports = { productSchema, signupSchema, signinSchema };



