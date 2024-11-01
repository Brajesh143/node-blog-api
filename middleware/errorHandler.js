const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
    if (err) {
        if (err.name === 'ValidationError') {
            const errMessage = err.message
            const message = errMessage.substring(errMessage.indexOf(":") + 1);
            const modifiedMessage = message.split(',');
            const newMessage = modifiedMessage.map((value) => {
                return value;
            })
            logger.error('ValidationError:', newMessage)
            return res.status(400).send(newMessage);
        }

        if (err.code === 11000) { // Duplicate key error
            logger.error('Error:', 'Username already exists')
            return res.status(409).send('Username already exists');
        }
        
        logger.error('Error:', err.message)
        return res.status(500).send(err.message);
    }
    next();
}