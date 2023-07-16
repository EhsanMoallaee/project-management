const { UserModel } = require("../../models/user");
const { hashString } = require("../../modules/hashString");

class AuthController {
    async register(req, res, next) {
        const { username, password, email, mobile} = req.body;
        const hashed_password = hashString(password);
        const user = await UserModel.create({
            username,
            email,
            password: hashed_password,
            mobile
        }).then(user => {return res.json(user)})
        .catch(err => {
            if(err?.code === 11000) {
                return next({ status: 400, message: `Duplicate value in path: ${Object.keys(err.keyPattern)} with value : ${Object.values(err.keyValue)}`})
            }
        })
    }

    login() {

    }

    resetPassword() {

    }
}

module.exports = {
    AuthController: new AuthController()
}