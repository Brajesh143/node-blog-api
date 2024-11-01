const logger = require("../utils/logger");

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        logger.error(`{ validation error ${error.details[0]} }`)
        return res.status(400).send(error.details[0].message);
    }
    next();
};

module.exports = validate;
