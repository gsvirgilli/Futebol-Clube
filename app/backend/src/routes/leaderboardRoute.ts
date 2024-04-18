import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/ControllersLeaderboard';

const router = Router();

const leaderBoardController = new LeaderboardController();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getHomeLeaderboard(req, res),
);
router.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getAwayLeaderboard(req, res),
);

export default router;
