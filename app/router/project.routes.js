const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { ProjectController } = require('../http/controllers/project.controller');
const { createProjectValidation } = require('../http/validations/project.validator');
const expressValidatorMapper = require('../http/middlewares/expressValidatorMapper');
const { checkLogin } = require('../http/middlewares/checkLogin');
const { expressUploadFile } = require('../modules/express-fileUpload');
const projectRouter = Router();

projectRouter.post('/create', [checkLogin, fileUpload(), expressUploadFile, createProjectValidation(), expressValidatorMapper], ProjectController.createProject);
projectRouter.get('/get-projects', checkLogin, ProjectController.getAllProject);
projectRouter.get('/get-project-byId/:id', checkLogin, ProjectController.getProjectByID);
projectRouter.delete('/delete-project/:id', checkLogin, ProjectController.removeProject);

module.exports =  projectRouter;