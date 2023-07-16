const { Router } = require('express');
const {registerValidator} = require('../http/validations/auth.validator');
const {AuthController} = require('../http/controllers/auth.controller');
const expressValidatorMapper = require('../http/middlewares/expressValidatorMapper');
const authRouter = Router();

authRouter.post('/register', [registerValidator(), expressValidatorMapper], AuthController.register)

module.exports = authRouter;