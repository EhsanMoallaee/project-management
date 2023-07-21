const { Router } = require('express');
const { UserController } = require('../http/controllers/user.controller');
const { checkLogin } = require('../http/middlewares/checkLogin');
const { upload_multer } = require('../modules/multer');
const { imageValidator } = require('../http/validations/image.validator');
const expressValidatorMapper = require('../http/middlewares/expressValidatorMapper');
const userRouter = Router();

userRouter.get("/profile", checkLogin, UserController.getProfile);
userRouter.patch("/profile", checkLogin, UserController.editProfile);
userRouter.post(
    "/profile-image",
    [upload_multer.single('image'), imageValidator(), expressValidatorMapper, checkLogin],
    UserController.uploadProfileImage
);
userRouter.get("/invitations", checkLogin, UserController.getAllInvitations);
userRouter.get("/invitations-by-status/:status", checkLogin, UserController.getInvitationsByStatus);
userRouter.get("/accept-reject-invitation/:invitationId/:newStatus", checkLogin, UserController.acceptOrRejectInvitation);

module.exports = userRouter;