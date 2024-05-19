module.exports = (err, req, res, next) => {
    if (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).send(err.message);
        }

        if (err.code === 11000) { // Duplicate key error
            return res.status(409).send('Username already exists');
        }

        return res.status(500).send(err.message);
    }
    next();
}