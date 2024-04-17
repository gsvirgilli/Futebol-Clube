import ITeam from '../Interfaces/Teams/ITeam';
import SequelizeTeam from '../database/models/teams';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private _model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbReturn = await this._model.findAll();
    return dbReturn.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbReturn = await this._model.findByPk(id);

    if (!dbReturn) return null;

    const { teamName }: ITeam = dbReturn;
    return { id, teamName };
  }
}
