import * as bcrypt from 'bcryptjs';
import IToken from '../Interfaces/Users/IToken';
import { ServiceResponse } from '../utils/ServiceResponse';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import ILogin from '../Interfaces/Users/ILogin';
import UserModel from '../models/UserModel';
import jwt from '../utils/jwt';

export default class UserService {
  constructor(
    private _userModel: IUserModel = new UserModel(),
  ) { }

  async verifyLogin(loginData: ILogin): Promise<ServiceResponse<IToken>> {
    const userFound = await this._userModel.findByEmail(loginData.email);

    if (!userFound || !bcrypt.compareSync(loginData.password, userFound.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { id, email } = userFound;
    const token = jwt.signToken({ id, email });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
