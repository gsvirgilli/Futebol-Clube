export default interface IMatch {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam?: {
    id?: number,
    teamName?: string,
  },
  awayTeam?: {
    id?: number,
    teamName?: string,
  }
}

export interface updateReq {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface createReq {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}
