const { validationResult } = require("express-validator");

function expressValidatorMapper(req, res, next) {
    const result = validationResult(req);
    if(result?.errors.length > 0) {
        let errorMessages = {};
        result.errors.forEach(err => {
            errorMessages[err.path] = err.msg;
        })
        return res.status(400).json({
            status: 400,
            success: false,
            errorMessages
        });
    }
    next();
}

module.exports = expressValidatorMapper;