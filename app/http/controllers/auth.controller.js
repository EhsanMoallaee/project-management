const bcrypt =require('bcrypt');
const { UserModel } = require("../../models/user");
const { hashString } = require("../../modules/hashString");
const { tokenGenerator } = require('../../modules/jwtToken');

class AuthController {

    async register(req, res, next) {
        const { username, password, email, mobile} = req.body;
        const hashed_password = hashString(password);
        const user = await UserModel.create({
            username,
            email,
            password: hashed_password,
            mobile
        }).then(user => {return res.status(200).json(user)})
        .catch(err => {
            if(err?.code === 11000) {
                return next({ status: 400, message: `Duplicate value in path: ${Object.keys(err.keyPattern)} with value : ${Object.values(err.keyValue)}`})
            }
        })
    }

    async login(req, res, next) {
        const { username, password } = req.body;
        console.log(req.headers);
        const user = await UserModel.findOne({ username });
        if(!user) {
            return next({ status: 401, message: 'Username or password is wrong' });
        }
        const compareResult = bcrypt.compareSync(password, user.password);
        if(!compareResult) {
            return next({ status: 401, message: 'Username or password is wrong' }) 
        };
        const token = tokenGenerator({username});
        user.token = token;
        await user.save()
        return res.json({
            status: 200,
            success: true,
            message: 'Login successfull',
            token
        })
    }

    resetPassword() {

    }
}

module.exports = {
    AuthController: new AuthController()
}