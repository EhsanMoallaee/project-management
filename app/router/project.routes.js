const { Router } = require('express');
const { ProjectController } = require('../http/controllers/project.controller');
const { createProjectValidation } = require('../http/validations/project.validator');
const expressValidatorMapper = require('../http/middlewares/expressValidatorMapper');
const { checkLogin } = require('../http/middlewares/checkLogin');
const projectRouter = Router();

projectRouter.post('/create', [checkLogin ,createProjectValidation(), expressValidatorMapper], ProjectController.createProject)

module.exports =  projectRouter;