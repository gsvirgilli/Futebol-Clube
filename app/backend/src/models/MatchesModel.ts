import SequelizeTeam from '../database/models/teams';
import IMatch, { createReq, updateReq } from '../Interfaces/Matches/IMatch';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import SequelizeMatch from '../database/models/matches';

interface WhereOptions {
  inProgress?: boolean;
}
export default class MatchModel implements IMatchModel {
  private _model = SequelizeMatch;

  async findAll(where?: WhereOptions): Promise<IMatch[]> {
    const dbReturn: IMatch[] = await this._model.findAll({
      ...where,
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbReturn.map((match) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: { teamName: match.homeTeam?.teamName },
      awayTeam: { teamName: match.awayTeam?.teamName },
    }));
  }

  async finish(id: number): Promise<'OK' | null> {
    const [affectedRows] = await this._model.update({ inProgress: false }, { where: { id } });

    if (affectedRows === 0) return null;
    return 'OK';
  }

  async updateGoals({ id, homeTeamGoals, awayTeamGoals }: updateReq):
  Promise<'OK' | null> {
    const [affectedRows] = await this._model.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });

    if (affectedRows === 0) return null;
    return 'OK';
  }

  async create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }: createReq):
  Promise<IMatch | null> {
    const dbReturn = await this._model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    if (!dbReturn) return null;
    return dbReturn;
  }
}
