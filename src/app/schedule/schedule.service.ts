import {Injectable} from '@angular/core';
import {Game} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  public numberOfWeeks: number = 0;
  public gameData = this.getGames();

  constructor() {
  }

  /*public getGames(): Game[] {
    return [
      {homeTeam:"Roadkill", awayTeam:"Blue City", field:"6A", gameDate: "04-14-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 7, awayScore: 2, week: 1},
      {homeTeam:"KMP", awayTeam:"Internationals", field:"6A", gameDate: "04-14-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 3, awayScore: 4, week: 1},
      {homeTeam:"Roadkill", awayTeam:"Internationals", field:"6A", gameDate: "04-21-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 6, awayScore: 5, week: 2},
      {homeTeam:"KMP", awayTeam:"Roadkill", field:"6B", gameDate: "04-28-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 0, awayScore: 2, week: 3},
      {homeTeam:"Roadkill", awayTeam:"Jolly Green Giants", field:"7A", gameDate: "05-05-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 3, awayScore: 3, week: 4},
      {homeTeam:"Rusty Knights", awayTeam:"Roadkill", field:"6A", gameDate: "05-12-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 2, awayScore: 7, week: 5},
      {homeTeam:"Blue City", awayTeam:"Rusty Knights", field:"6A", gameDate: "05-12-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 10, awayScore: 0, week: 5}
    ];
  }*/

  public getGames(): Game[] {
    return new Array<Game>();
  }

  public getNumberOfWeeks() {
    this.gameData.forEach(game => {
      if (game.week != this.numberOfWeeks) {
        this.numberOfWeeks++;
      }
    });
  }
}

/*export const data = [
  {homeTeam:"Roadkill", awayTeam:"Blue City", field:"6A", gameDate: "04-14-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 7, awayScore: 2, week: 1},
  {homeTeam:"Man U", awayTeam:"Wrexham", field:"6A", gameDate: "04-14-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 0, awayScore: 10, week: 1},
  {homeTeam:"Roadkill", awayTeam:"Internationals", field:"6A", gameDate: "04-21-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 6, awayScore: 5, week: 2},
  {homeTeam:"Bayern", awayTeam:"Roadkill", field:"6B", gameDate: "04-28-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 0, awayScore: 2, week: 3},
  {homeTeam:"Roadkill", awayTeam:"Wrexham", field:"7A", gameDate: "05-05-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 3, awayScore: 3, week: 4},
  {homeTeam:"Man U", awayTeam:"Roadkill", field:"6A", gameDate: "05-12-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 2, awayScore: 7, week: 5},
  {homeTeam:"Blue City", awayTeam:"Rusty Knights", field:"6A", gameDate: "05-12-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 10, awayScore: 0, week: 5}
];*/
