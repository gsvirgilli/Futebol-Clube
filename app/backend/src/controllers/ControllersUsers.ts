import { Request, Response } from 'express';
import IRequestUser from '../Interfaces/requestToken';
import UserService from '../services/ServiceUsers';
import mapStatusHTTP from '../utils/mapHTTP';

export default class LoginController {
  constructor(
    private _userService = new UserService(),
  ) { }

  async login(req: Request, res: Response) {
    const response = await this._userService.verifyLogin(req.body);

    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    res.status(mapStatusHTTP('SUCCESSFUL')).json(response.data);
  }

  static returnUserRole(req: IRequestUser, res: Response) {
    const { user } = req;

    res.status(mapStatusHTTP('SUCCESSFUL')).json({ role: user?.role });
  }
}
