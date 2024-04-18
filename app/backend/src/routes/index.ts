import { Router } from 'express';
import teamRouter from './teamRoute';
import loginRouter from './loginRoute';
import matchesRouter from './matchesRoute';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);

export default router;
