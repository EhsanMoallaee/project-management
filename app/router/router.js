const { Router } = require('express');
const authRouter = require('./auth.routes');
const projectRouter = require('./project.routes');
const teamRouter = require('./team.routes');
const userRouter = require('./user.routes');

const router = Router();

router.use('/auth', authRouter);
router.use('/project', projectRouter);
router.use('/team', teamRouter);
router.use('/user', userRouter);

module.exports = router;