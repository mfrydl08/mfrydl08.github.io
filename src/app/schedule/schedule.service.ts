import {Injectable} from '@angular/core';
import {Game} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  public gameData = this.getGames();

  public getGames(): Game[] {
    const games: Game[] = [];
    const gameData = [
      {homeTeam:"Jolly Green Giants", awayTeam:"Absinthe Minded", field:"6B", gameDate: "04-21-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 8, awayScore: 4, week: 1, status: ""},
      {homeTeam:"KMP", awayTeam:"Roadkill", field:"6B", gameDate: "04-21-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 3, awayScore: 4, week: 1, status: ""},
      {homeTeam:"Mustangs FC", awayTeam:"Blue City", field:"6B", gameDate: "04-21-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 1, awayScore: 2, week: 1, status: ""},
      {homeTeam:"Rusty Knights", awayTeam:"Blue City", field:"6B", gameDate: "04-21-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 4, awayScore: 9, week: 1, status: ""},
      {homeTeam:"Agony of Da Feet", awayTeam:"Internationals", field:"7B", gameDate: "04-21-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 2, awayScore: 6, week: 1, status: ""},

      {homeTeam:"Blue City", awayTeam:"Jolly Green Giants", field:"Ballenger Creek Park: Foreman Field A", gameDate: "06-09-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2, status: "Rescheduled"},
      {homeTeam:"Jolly Green Giants", awayTeam:"Agony of Da Feet", field:"Ballenger Creek Park: Foreman Field A", gameDate: "06-09-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2, status: "Rescheduled"},
      {homeTeam:"Rusty Knights", awayTeam:"Mustangs FC", field:"Ballenger Creek Park: Foreman Field B", gameDate: "06-09-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2, status: "Rescheduled"},
      {homeTeam:"Agony of Da Feet", awayTeam:"Roadkill", field:"Ballenger Creek Park: Foreman Field A", gameDate: "06-09-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2, status: "Rescheduled"},
      {homeTeam:"Internationals", awayTeam:"KMP", field:"Ballenger Creek Park: Foreman Field B", gameDate: "06-09-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2, status: "Rescheduled"},
      {homeTeam:"Roadkill", awayTeam:"Absinthe Minded", field:"Ballenger Creek Park: Foreman Field B", gameDate: "06-09-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2, status: "Rescheduled"},

      {homeTeam:"Roadkill", awayTeam:"Blue City", field:"6B", gameDate: "05-05-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 4, awayScore: 8, week: 3, status: ""},
      {homeTeam:"Jolly Green Giants", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-05-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 6, awayScore: 2, week: 3, status: ""},
      {homeTeam:"Absinthe Minded", awayTeam:"Internationals", field:"6B", gameDate: "05-05-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 3, awayScore: 4, week: 3, status: ""},
      {homeTeam:"Mustangs FC", awayTeam:"Absinthe Minded", field:"6B", gameDate: "05-05-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 4, awayScore: 3, week: 3, status: ""},
      {homeTeam:"KMP", awayTeam:"Agony of Da Feet", field:"7A", gameDate: "05-05-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 3, awayScore: 3, week: 3, status: ""},

      {homeTeam:"Rusty Knights", awayTeam:"Roadkill", field:"6B", gameDate: "05-12-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 0, awayScore: 5, week: 4, status: ""},
      {homeTeam:"Internationals", awayTeam:"Blue City", field:"6B", gameDate: "05-12-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 4, awayScore: 7, week: 4, status: ""},
      {homeTeam:"Mustangs FC", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "05-12-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 9, awayScore: 3, week: 4, status: ""},
      {homeTeam:"KMP", awayTeam:"Mustangs FC", field:"6B", gameDate: "05-12-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 2, awayScore: 12, week: 4, status: ""},
      {homeTeam:"Absinthe Minded", awayTeam:"Agony of Da Feet", field:"7A", gameDate: "05-12-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 3, awayScore: 3, week: 4, status: ""},

      {homeTeam:"Roadkill", awayTeam:"Mustangs FC", field:"6B", gameDate: "05-19-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 2, awayScore: 7, week: 5, status: ""},
      {homeTeam:"Internationals", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-19-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 5, awayScore: 2, week: 5, status: ""},
      {homeTeam:"Absinthe Minded", awayTeam:"KMP", field:"6B", gameDate: "05-19-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 2, awayScore: 4, week: 5, status: ""},
      {homeTeam:"KMP", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "05-19-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 3, awayScore: 4, week: 5, status: ""},
      {homeTeam:"Blue City", awayTeam:"Agony of Da Feet", field:"7B", gameDate: "05-19-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 11, awayScore: 3, week: 5, status: ""},

      {homeTeam:"Jolly Green Giants", awayTeam:"Roadkill", field:"6B", gameDate: "05-26-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 9, awayScore: 7, week: 6, status: ""},
      {homeTeam:"Mustangs FC", awayTeam:"Internationals", field:"6B", gameDate: "05-26-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 4, awayScore: 5, week: 6, status: ""},
      {homeTeam:"Agony of Da Feet", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-26-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 4, awayScore: 1, week: 6, status: ""},
      {homeTeam:"Absinthe Minded", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-26-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 5, awayScore: 1, week: 6, status: ""},
      {homeTeam:"Blue City", awayTeam:"KMP", field:"7A", gameDate: "05-26-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 8, awayScore: 3, week: 6, status: ""},

      {homeTeam:"Agony of Da Feet", awayTeam:"Mustangs FC", field:"6B", gameDate: "06-02-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7, status: ""},
      {homeTeam:"Rusty Knights", awayTeam:"KMP", field:"6B", gameDate: "06-02-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7, status: ""},
      {homeTeam:"Internationals", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "06-02-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7, status: ""},
      {homeTeam:"Roadkill", awayTeam:"Internationals", field:"6B", gameDate: "06-02-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7, status: ""},
      {homeTeam:"Blue City", awayTeam:"Absinthe Minded", field:"7A", gameDate: "06-02-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7, status: ""},
    ];

    gameData.forEach(game => {
      if (game.isScoreFinal) {
        games.push(game);
      }
    })

    return games;
  }


  // public getGames(): Game[] {
  //   return [
  //     {homeTeam:"Jolly Green Giants", awayTeam:"Absinthe Minded", field:"6B", gameDate: "04-21-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 1},
  //     {homeTeam:"KMP", awayTeam:"Roadkill", field:"6B", gameDate: "04-21-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 1},
  //     {homeTeam:"Mustangs FC", awayTeam:"Blue City", field:"6B", gameDate: "04-21-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 1},
  //     {homeTeam:"Rusty Knights", awayTeam:"Blue City", field:"6B", gameDate: "04-21-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 1},
  //     {homeTeam:"Agony of Da Feet", awayTeam:"Internationals", field:"7B", gameDate: "04-21-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 1},
  //
  //     {homeTeam:"Blue City", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "04-28-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2},
  //     {homeTeam:"Jolly Green Giants", awayTeam:"Agony of Da Feet", field:"6B", gameDate: "04-28-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2},
  //     {homeTeam:"Agony of Da Feet", awayTeam:"Roadkill", field:"6B", gameDate: "04-28-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2},
  //     {homeTeam:"Roadkill", awayTeam:"Absinthe Minded", field:"6A", gameDate: "04-28-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2},
  //     {homeTeam:"Rusty Knights", awayTeam:"Mustangs FC", field:"6B", gameDate: "04-28-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2},
  //     {homeTeam:"Internationals", awayTeam:"KMP", field:"7B", gameDate: "04-28-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2},
  //
  //     {homeTeam:"Roadkill", awayTeam:"Blue City", field:"6B", gameDate: "05-05-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 3},
  //     {homeTeam:"Jolly Green Giants", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-05-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 3},
  //     {homeTeam:"Absinthe Minded", awayTeam:"Internationals", field:"6B", gameDate: "05-05-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 3},
  //     {homeTeam:"Mustangs FC", awayTeam:"Absinthe Minded", field:"6B", gameDate: "05-05-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 3},
  //     {homeTeam:"KMP", awayTeam:"Agony of Da Feet", field:"7A", gameDate: "05-05-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 3},
  //
  //     {homeTeam:"Rusty Knights", awayTeam:"Roadkill", field:"6B", gameDate: "05-12-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 4},
  //     {homeTeam:"Internationals", awayTeam:"Blue City", field:"6B", gameDate: "05-12-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 4},
  //     {homeTeam:"Mustangs FC", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "05-12-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 4},
  //     {homeTeam:"KMP", awayTeam:"Mustangs FC", field:"6B", gameDate: "05-12-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 4},
  //     {homeTeam:"Absinthe Minded", awayTeam:"Agony of Da Feet", field:"7A", gameDate: "05-12-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 4},
  //
  //     {homeTeam:"Roadkill", awayTeam:"Mustangs FC", field:"6B", gameDate: "05-19-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 5},
  //     {homeTeam:"Internationals", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-19-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 5},
  //     {homeTeam:"Absinthe Minded", awayTeam:"KMP", field:"6B", gameDate: "05-19-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 5},
  //     {homeTeam:"KMP", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "05-19-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 5},
  //     {homeTeam:"Blue City", awayTeam:"Agony of Da Feet", field:"7B", gameDate: "05-19-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 5},
  //
  //     {homeTeam:"Jolly Green Giants", awayTeam:"Roadkill", field:"6B", gameDate: "05-26-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 6},
  //     {homeTeam:"Mustangs FC", awayTeam:"Internationals", field:"6B", gameDate: "05-26-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 6},
  //     {homeTeam:"Agony of Da Feet", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-26-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 6},
  //     {homeTeam:"Absinthe Minded", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-26-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 6},
  //     {homeTeam:"Blue City", awayTeam:"KMP", field:"7A", gameDate: "05-26-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 6},
  //
  //     {homeTeam:"Agony of Da Feet", awayTeam:"Mustangs FC", field:"6B", gameDate: "06-02-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7},
  //     {homeTeam:"Rusty Knights", awayTeam:"KMP", field:"6B", gameDate: "06-02-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7},
  //     {homeTeam:"Internationals", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "06-02-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7},
  //     {homeTeam:"Roadkill", awayTeam:"Internationals", field:"6B", gameDate: "06-02-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7},
  //     {homeTeam:"Blue City", awayTeam:"Absinthe Minded", field:"7A", gameDate: "06-02-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7}
  //   ];
  // }

  public getNumberOfWeeks(): number {
    let numberOfWeeks = 0;
    this.gameData.forEach(game => {
      if (game.week != numberOfWeeks) {
        numberOfWeeks++;
      }
    });

    return numberOfWeeks;
  }
}
