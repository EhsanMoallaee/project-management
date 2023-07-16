const { UserModel } = require("../../models/user");
const { hashString } = require("../../modules/hashString");

class AuthController {
    async register(req, res, next) {
        try {
            const { username, password, email, mobile} = req.body;
            const hashed_password = hashString(password);
            const user = await UserModel.create({
                username,
                email,
                password: hashed_password,
                mobile
            }).catch(err => {
                if(err?.code === 11000) {
                    throw { status: 400, message: `Duplicate value in path: ${Object.keys(err.keyPattern)} with value : ${Object.values(err.keyValue)}`}
                }
            })
            return res.json(user)
        } catch (error) {
            next(error);
        }
    }

    login() {

    }

    resetPassword() {

    }
}

module.exports = {
    AuthController: new AuthController()
}