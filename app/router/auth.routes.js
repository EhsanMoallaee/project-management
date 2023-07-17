const { Router } = require('express');
const {registerValidator, loginValidator} = require('../http/validations/auth.validator');
const {AuthController} = require('../http/controllers/auth.controller');
const expressValidatorMapper = require('../http/middlewares/expressValidatorMapper');
const authRouter = Router();

authRouter.post('/register', [registerValidator(), expressValidatorMapper], AuthController.register);
authRouter.post('/login', [loginValidator(), expressValidatorMapper], AuthController.login);

module.exports = authRouter;