const { body } = require('express-validator');

function registerValidator() {
    return [
        body('username').custom((value, ctx) => {
            if(value) {
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{4,22}/gi ;
                if(usernameRegex.test(value)) {
                    return true;
                } else {
                    throw 'Username is not acceptable';
                }
            } else {
                throw 'Username can not be empty';
            }
        }),
        body('email').isEmail().withMessage('Wrong email'),
        body('mobile').isMobilePhone('fa-IR').withMessage('Mobile number is not acceptable'),
        body('password').isLength({ min: 8, max: 16}).withMessage('Password must have atleast 8 and maximum 16 characters')
        .custom((value, ctx) => {
            if(value !== ctx?.req?.body?.confirm_password) throw 'Password and confirm password don\'t match';
            return true;
        })
    ]
}

module.exports = {
    registerValidator
};

// 'fa-IR': /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/