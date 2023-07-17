
class UserController {
    getProfile(req, res, next) {
        const user = req.user;
        if(!user) return next({status: 404, message: 'User not found!'});
        return res.status(200).json({
            status: 200,
            success: true,
            user
        });
    }
}

module.exports = {
    UserController: new UserController()
}