import { Request, Response, Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import MatchController from '../controllers/ControllersMatches';

const matchController = new MatchController();
const authMiddleware = new AuthMiddleware();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
router.post(
  '/',
  authMiddleware.authenticate,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);
router.patch(
  '/:id',
  authMiddleware.authenticate,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);
router.patch(
  '/:id/finish',
  authMiddleware.authenticate,
  (req: Request, res: Response) => matchController.endMatch(req, res),
);

export default router;
