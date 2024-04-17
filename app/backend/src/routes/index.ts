import { Router } from 'express';
import teamRouter from './teamRoute';

const router = Router();

router.use('/teams', teamRouter);

export default router;
