const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: {
        type: String,
        required: [true, 'first name is required'],
        minlength: [3, 'first name must be at least 3 characters long'],
        maxlength: [30, 'first name must be at most 30 characters long']
    },
    lname: {
        type: String,
        required: [true, 'last name is required'],
        minlength: [3, 'last name must be at least 3 characters long'],
        maxlength: [30, 'last name must be at most 30 characters long']
    },
    username: {
        type: String,
        required: [true, 'username name is required'],
        unique: true,
        minlength: [3, 'username must be at least 3 characters long'],
        maxlength: [30, 'username must be at most 30 characters long']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'password must be at least 8 characters long']
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    image: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)