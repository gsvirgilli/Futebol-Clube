import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapHTTP';
import LeaderboardService from '../services/ServiceLeaderboard';

export default class LeaderboardController {
  constructor(
    private _leaderboardService = new LeaderboardService(),
  ) { }

  async getAwayLeaderboard(_req: Request, res: Response) {
    const board = await this._leaderboardService.awayLeaderboard();
    res.status(mapStatusHTTP('SUCCESSFUL')).json(board);
  }

  async getHomeLeaderboard(_req: Request, res: Response) {
    const board = await this._leaderboardService.homeLeaderboard();
    res.status(mapStatusHTTP('SUCCESSFUL')).json(board);
  }
}
