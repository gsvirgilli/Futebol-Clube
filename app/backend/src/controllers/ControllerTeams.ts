import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapHTTP';
import TeamService from '../services/ServiceTeams';

export default class TeamController {
  constructor(
    private _teamService = new TeamService(),
  ) { }

  async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this._teamService.getAllTeams();
    res.status(mapStatusHTTP('SUCCESSFUL')).json(serviceResponse.data);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this._teamService.getTeamById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(mapStatusHTTP('SUCCESSFUL')).json(serviceResponse.data);
  }
}
