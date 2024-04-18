import IUser from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import SequelizeUser from '../database/models/users';

export default class UserModel implements IUserModel {
  private _model = SequelizeUser;

  async findByEmail(query: string): Promise<IUser | null> {
    const result = await this._model.findOne({ where: { email: query } });

    if (!result) return null;

    const { id, email, username, role, password }: IUser = result;
    return { id, email, username, role, password };
  }
}
