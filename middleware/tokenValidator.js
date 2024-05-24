const asyncHandler = require('express-async-handlr')
const jwt = require('jsonwebtoken')
const Blacklist = require('../model/blacklist')

const tokenValidate = asyncHandler(async (req, res, next) => {
    const authHeader = req.get('Authorization');
    
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        return next(error)
    }
    const token = authHeader.split(' ')[1];

    const checkIfBlacklisted = await Blacklist.findOne({ token: token }); // Check if that token is blacklisted
    // if true, send an unathorized message, asking for a re-authentication.
    if (checkIfBlacklisted)
        return res
            .status(401)
            .json({ message: "This session has expired. Please login" });

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } catch (err) {
        err.statusCode = 500;
        return next(err)
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        return next(error)
    }
    req.userId = decodedToken.userId;
    next();
})

module.exports = tokenValidate;