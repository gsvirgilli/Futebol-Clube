import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import { ServiceMessage, ServiceResponse } from '../utils/ServiceResponse';
import IMatch, { createReq } from '../Interfaces/Matches/IMatch';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import MatchModel from '../models/MatchesModel';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  constructor(
    private _MatchModel: IMatchModel = new MatchModel(),
    private _TeamModel: ITeamModel = new TeamModel(),
  ) { }

  async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this._MatchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  async getFilteredMatches(queryStr: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this._MatchModel.findAll();

    if (queryStr === 'true') {
      const filteredMatches = allMatches.filter(({ inProgress }) => inProgress === true);
      return { status: 'SUCCESSFUL', data: filteredMatches };
    }
    if (queryStr === 'false') {
      const filteredMatches = allMatches.filter(({ inProgress }) => inProgress === false);
      return { status: 'SUCCESSFUL', data: filteredMatches };
    }

    return { status: 'NOT_FOUND', data: { message: 'No match found for your filter' } };
  }

  async endMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const modelReturn = await this._MatchModel.finish(id);

    if (!modelReturn) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<ServiceMessage>> {
    const modelReturn = await this._MatchModel.updateGoals({ id, homeTeamGoals, awayTeamGoals });

    if (!modelReturn) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async createMatch(body: createReq): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = body;
    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const homeTeam = await this._TeamModel.findById(homeTeamId);
    const awayTeam = await this._TeamModel.findById(awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this._MatchModel.create(body);

    if (!newMatch) return { status: 'CONFLICT', data: { message: 'Match not created' } };
    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
