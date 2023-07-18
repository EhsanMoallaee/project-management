const { UserModel } = require("../../models/user");
const { verifyToken } = require("../../modules/jwtToken");

const checkLogin = async (req, res, next) => {
    let authError = { status: 401, message: 'Please login first' };
    const authorization  = req?.headers?.authorization;
    if(!authorization) return next(authError);

    let token = authorization.split(' ')?.[1];
    if(!token) return next(authError);
    
    const result = verifyToken(token);
    if(!result) return next(authError);
    const user = await UserModel.findOne({ username: result.username }, { password: 0});
    if(!user) return next(authError);
    req.user = user;
    next();
}

module.exports = {
    checkLogin
}