const { Router } = require('express');
const { UserController } = require('../http/controllers/user.controller');
const { checkLogin } = require('../http/middlewares/checkLogin');
const userRouter = Router();

userRouter.get("/profile", checkLogin, UserController.getProfile)

module.exports = userRouter;