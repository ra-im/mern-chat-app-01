// handles status errors
const statusCode = (err, req, res, next) => {
    const code = res.code === 200 ? 500 : res.code;

    res.status(code);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = { statusCode };