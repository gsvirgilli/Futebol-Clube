import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapHTTP';
import MatchService from '../services/ServiceMatches';

export default class MatchController {
  constructor(
    private _matchService = new MatchService(),
  ) { }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (typeof (inProgress) === 'string') {
      const serviceResponse = await this._matchService.getFilteredMatches(inProgress);

      if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
      }
      return res.status(mapStatusHTTP('SUCCESSFUL')).json(serviceResponse.data);
    }
    const serviceResponse = await this._matchService.getAllMatches();
    res.status(mapStatusHTTP('SUCCESSFUL')).json(serviceResponse.data);
  }

  async endMatch(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this._matchService.endMatch(Number(id));
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const serviceResponse = await this._matchService
      .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async createMatch(req: Request, res: Response) {
    const serviceResponse = await this._matchService.createMatch(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(201).json(serviceResponse.data);
  }
}
