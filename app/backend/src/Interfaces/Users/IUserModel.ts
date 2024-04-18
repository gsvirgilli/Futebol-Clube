import IUser from './IUser';

export interface IUserModel {
  findByEmail(query: string): Promise<IUser | null>,
}
