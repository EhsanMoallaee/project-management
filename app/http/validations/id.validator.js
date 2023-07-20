const { param } = require("express-validator");

function idValidator() {
    return [
        param('id').isMongoId().withMessage('Sent ID is not valid'),
    ]
}

module.exports = {
    idValidator,
}