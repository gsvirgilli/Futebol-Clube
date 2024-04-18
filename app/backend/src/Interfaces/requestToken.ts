import { Request } from 'express';
import IUser from './Users/IUser';

export default interface IRequestUser extends Request {
  user?: IUser;
}
