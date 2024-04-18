import { Request, Response, Router } from 'express';
import IRequestWithUser from '../Interfaces/requestToken';
import LoginController from '../controllers/ControllersUsers';
import loginValid from '../middlewares/loginValid';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const loginController = new LoginController();
const authMiddleware = new AuthMiddleware();

const router = Router();

router.post('/', loginValid, (req: Request, res: Response) => loginController.login(req, res));
router.get(
  '/role',
  authMiddleware.authenticate,
  (req: Request, res: Response) => LoginController.returnUserRole(req as IRequestWithUser, res),
);

export default router;
