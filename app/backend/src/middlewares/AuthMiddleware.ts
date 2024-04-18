import { Response, NextFunction } from 'express';
import jwtUtil from '../utils/jwt';
import UserModel from '../models/UserModel';
import IRequestWithUser from '../Interfaces/requestToken';

export default class AuthMiddleware {
  constructor(
    private _UserModel = new UserModel(),
  ) {
    this.authenticate = this.authenticate.bind(this);
  }

  static extractToken(auth: string) {
    return auth.split(' ')[1];
  }

  async authenticate(req: IRequestWithUser, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const token = AuthMiddleware.extractToken(authorization);

    try {
      const decoded = await jwtUtil.verifyToken(token);
      const user = await this._UserModel.findByEmail(decoded.email);
      if (!user) return res.status(401).json({ message: 'Token must be a valid token' });

      req.user = user;

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
