const { Router } = require('express');
const { checkLogin } = require('../http/middlewares/checkLogin');
const { TeamController } = require('../http/controllers/team.controller');
const { createTeamValidator } = require('../http/validations/team.validator');
const { idValidator } = require('../http/validations/id.validator');
const expressValidatorMapper = require('../http/middlewares/expressValidatorMapper');
const teamRouter = Router();

teamRouter.post("/create", [checkLogin, createTeamValidator(), expressValidatorMapper], TeamController.createTeam);
teamRouter.patch("/update/:id", [checkLogin, idValidator(), createTeamValidator(), expressValidatorMapper], TeamController.updateTeam);
teamRouter.delete("/delete/:id", [checkLogin, idValidator(), expressValidatorMapper], TeamController.removeTeam);
teamRouter.get("/invite-user/:teamId/:username", [checkLogin], TeamController.inviteUserToTeam);
teamRouter.get("/get-teams", [checkLogin], TeamController.getAllTeams);
teamRouter.get("/get-team-byId/:id", [checkLogin, idValidator(), expressValidatorMapper], TeamController.getTeamById);
teamRouter.get("/get-my-teams", [checkLogin], TeamController.getMyTeams);

module.exports = teamRouter;