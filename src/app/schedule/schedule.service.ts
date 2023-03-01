import {Injectable} from '@angular/core';
import {Game} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  public numberOfWeeks = 0;
  public gameData = this.getGames();

  public getGames(): Game[] {
    return [
      {homeTeam:"Roadkill", awayTeam:"Internationals", field:"6A", gameDate: "04-14-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 7, awayScore: 2, week: 1},
      {homeTeam:"Jolly Green Giants", awayTeam:"Blue City", field:"6A", gameDate: "04-14-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 3, awayScore: 4, week: 1},
      {homeTeam:"Absinthe Minded", awayTeam:"Agony of Da Feet", field:"6A", gameDate: "04-14-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 7, awayScore: 2, week: 1},
      {homeTeam:"KMP", awayTeam:"Rusty Knights", field:"6A", gameDate: "04-14-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 3, awayScore: 2, week: 1},
      {homeTeam:"Roadkill", awayTeam:"Absinthe Minded", field:"6A", gameDate: "04-21-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 6, awayScore: 5, week: 2},
      {homeTeam:"Blue City", awayTeam:"Internationals", field:"6A", gameDate: "04-21-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 6, awayScore: 6, week: 2},
      {homeTeam:"Agony of Da Feet", awayTeam:"KMP", field:"6A", gameDate: "04-21-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 6, awayScore: 5, week: 2},
      {homeTeam:"Jolly Green Giants", awayTeam:"Rusty Knights", field:"6A", gameDate: "04-21-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 5, awayScore: 1, week: 2},
      {homeTeam:"KMP", awayTeam:"Roadkill", field:"6B", gameDate: "04-28-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 0, awayScore: 2, week: 3},
      {homeTeam:"Roadkill", awayTeam:"Jolly Green Giants", field:"7A", gameDate: "05-05-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 2, awayScore: 3, week: 4},
      {homeTeam:"Rusty Knights", awayTeam:"Roadkill", field:"6A", gameDate: "05-12-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 2, awayScore: 7, week: 5},
      {homeTeam:"Blue City", awayTeam:"Rusty Knights", field:"6A", gameDate: "05-12-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 10, awayScore: 0, week: 5}
    ];
  }

  // public getGames(): Game[] {
  //   return new Array<Game>();
  // }

  public getNumberOfWeeks() {
    this.gameData.forEach(game => {
      if (game.week != this.numberOfWeeks) {
        this.numberOfWeeks++;
      }
    });
  }
}
