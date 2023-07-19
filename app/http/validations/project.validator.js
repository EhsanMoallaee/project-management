const { body } = require("express-validator")

function createProjectValidation() {
    return [
        body('title').notEmpty().withMessage('Project must have a title'),
        body('text').notEmpty().isLength({ min: 20 }).withMessage('Project description must have atleast 20 characters'),
    ]
}

module.exports = {
    createProjectValidation,
}