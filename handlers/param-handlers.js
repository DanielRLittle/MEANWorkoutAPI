module.exports = (req, res, params, next) => {
    for (const param of params) {
        if (param && !req.query[param]) {
            return res.status(500).send(`Request failed. Request must include '${param}' param.`);
        }
    }
    return next();
};