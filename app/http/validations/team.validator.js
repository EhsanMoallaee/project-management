const { body, param } = require("express-validator");
const { TeamModel } = require("../../models/team");

function createTeamValidator() {
    return [
        body('name').trim().isLength({ min: 5, max: 25}).withMessage('Team name can\'t be less than 5 characters'),
        body('description').trim().isLength({ min: 10, max: 100}).withMessage('Team description can\'t be less than 10 characters'),
        body('username').custom(async (username) => {
            const usernameRegex = /^[a-z]+[a-z0-9\_\.]{4,}$/gim ;
            if(usernameRegex.test(username)) {
                const team = await TeamModel.findOne({ username });
                if(team) throw ('This username has been used before by another team');
                return true;
            } else {
                throw ('Username can\'t be less than 5 characters and just can have alphabets,numbers,. and _');
            }
        }),
    ]
}

module.exports = {
    createTeamValidator,
}