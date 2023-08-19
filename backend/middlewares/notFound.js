// handles 'NOT FOUND' errors for routes that do not exist
const notFound = (req, res, next) => {
    const error = new Error(`${req.originalUrl} was not found`);

    res.status(404);
    next(error);
}

module.exports = { notFound };