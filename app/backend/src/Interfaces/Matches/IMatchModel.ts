import IMatch, { createReq, updateReq } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  finish(id: number): Promise<'OK' | null>,
  updateGoals(body: updateReq): Promise<'OK' | null>,
  create(body: createReq): Promise<IMatch | null>
}
