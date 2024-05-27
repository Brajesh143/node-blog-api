const jwt = require('jsonwebtoken')
const asyncHandlr = require('express-async-handlr')
const Blacklist = require('../model/blacklist')

const tokenValidator = async (req, res, next) => {
    try {
        // Retrieve token from the headers
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
        if (token == null) {
            return res.status(401).json({ message: 'No token provided' });
        }
  
        // Check if the token is blacklisted
        const result = await Blacklist.findOne({ token: token });
        if (result) {
            return res.status(401).json({ message: 'This session has expired. Please login' });
        }
  
        // Verify the token
        jwt.verify(token, 'somesupersecretsecret', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
  
            // Attach user info to the request object
            req.userId = user.userId;
            next(); // Proceed to the next middleware or route handler
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = tokenValidator;

