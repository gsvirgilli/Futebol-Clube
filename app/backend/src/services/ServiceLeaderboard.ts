import MatchModel from '../models/MatchesModel';
import IMatch from '../Interfaces/Matches/IMatch';
import ILeaderboard from '../Interfaces/ILeaderboard';

export default class LeaderboardService extends MatchModel {
  static win(home: number, away: number) {
    if (home > away) return 1;
    return 0;
  }

  static loss(home: number, away: number) {
    if (home < away) return 1;
    return 0;
  }

  static draw(home: number, away: number) {
    if (home === away) return 1;
    return 0;
  }

  static totalPoints(home: number, away: number) {
    if (LeaderboardService.win(home, away) === 1) return 3;
    if (LeaderboardService.draw(home, away) === 1) return 1;
    return 0;
  }

  static createAwayTeam(match: IMatch) {
    return {
      name: match.homeTeam?.teamName,
      totalPoints: LeaderboardService.totalPoints(match.awayTeamGoals, match.homeTeamGoals),
      totalGames: 1,
      totalVictories: LeaderboardService.win(match.awayTeamGoals, match.homeTeamGoals),
      totalDraws: LeaderboardService.draw(match.awayTeamGoals, match.homeTeamGoals),
      totalLosses: LeaderboardService.loss(match.awayTeamGoals, match.homeTeamGoals),
      goalsFavor: match.awayTeamGoals,
      goalsOwn: match.homeTeamGoals,
    };
  }

  static createHomeTeam(match: IMatch) {
    return {
      name: match.homeTeam?.teamName,
      totalPoints: LeaderboardService.totalPoints(match.homeTeamGoals, match.awayTeamGoals),
      totalGames: 1,
      totalVictories: LeaderboardService.win(match.homeTeamGoals, match.awayTeamGoals),
      totalDraws: LeaderboardService.draw(match.homeTeamGoals, match.awayTeamGoals),
      totalLosses: LeaderboardService.loss(match.homeTeamGoals, match.awayTeamGoals),
      goalsFavor: match.homeTeamGoals,
      goalsOwn: match.awayTeamGoals,
    };
  }

  async homeLeaderboard() {
    const partidas = await this.findAll({ inProgress: false });
    const tabela: ILeaderboard[] = [];

    partidas.forEach((partida) => {
      const indiceEquipeCasa = tabela.findIndex((t) => t.name === partida.homeTeam?.teamName);
      if (indiceEquipeCasa !== -1) {
        const teamEd = tabela[indiceEquipeCasa];
        teamEd.totalPoints += LeaderboardService
          .totalPoints(partida.homeTeamGoals, partida.awayTeamGoals);
        teamEd.totalGames += 1;
        teamEd.totalVictories += LeaderboardService.win(partida
          .homeTeamGoals, partida.awayTeamGoals);
        teamEd.totalDraws += LeaderboardService.draw(partida.homeTeamGoals, partida.awayTeamGoals);
        teamEd.totalLosses += LeaderboardService.loss(partida.homeTeamGoals, partida.awayTeamGoals);
        teamEd.goalsFavor += partida.homeTeamGoals;
        teamEd.goalsOwn += partida.awayTeamGoals;
      } else { tabela.push(LeaderboardService.createHomeTeam(partida)); }
    });

    return tabela;
  }

  async awayLeaderboard() {
    const partidas = await this.findAll({ inProgress: false });
    const tabela: ILeaderboard[] = [];

    partidas.forEach((partida) => {
      const indiceEquipeVisitante = tabela.findIndex((t) => t.name === partida.awayTeam?.teamName);
      if (indiceEquipeVisitante !== -1) {
        const teamEd = tabela[indiceEquipeVisitante];
        teamEd.totalPoints += LeaderboardService
          .totalPoints(partida.awayTeamGoals, partida.homeTeamGoals);
        teamEd.totalGames += 1;
        teamEd.totalVictories += LeaderboardService.win(partida
          .awayTeamGoals, partida.homeTeamGoals);
        teamEd.totalDraws += LeaderboardService.draw(partida.awayTeamGoals, partida.homeTeamGoals);
        teamEd.totalLosses += LeaderboardService.loss(partida.awayTeamGoals, partida.homeTeamGoals);
        teamEd.goalsFavor += partida.awayTeamGoals;
        teamEd.goalsOwn += partida.homeTeamGoals;
      } else { tabela.push(LeaderboardService.createAwayTeam(partida)); }
    });

    return tabela;
  }
}
