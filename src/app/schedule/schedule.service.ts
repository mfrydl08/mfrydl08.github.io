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
      {homeTeam:"Jolly Green Giants", awayTeam:"Absinthe Minded", field:"6B", gameDate: "04-21-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 1},
      {homeTeam:"KMP", awayTeam:"Roadkill", field:"6B", gameDate: "04-21-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 1},
      {homeTeam:"Mustangs FC", awayTeam:"Blue City", field:"6B", gameDate: "04-21-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 1},
      {homeTeam:"Rusty Knights", awayTeam:"Blue City", field:"6B", gameDate: "04-21-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 1},
      {homeTeam:"Agony of Da Feet", awayTeam:"Internationals", field:"7B", gameDate: "04-21-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 1},

      {homeTeam:"Blue City", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "04-28-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2},
      {homeTeam:"Jolly Green Giants", awayTeam:"Agony of Da Feet", field:"6B", gameDate: "04-28-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2},
      {homeTeam:"Agony of Da Feet", awayTeam:"Roadkill", field:"6B", gameDate: "04-28-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2},
      {homeTeam:"Roadkill", awayTeam:"Absinthe Minded", field:"6A", gameDate: "04-28-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2},
      {homeTeam:"Rusty Knights", awayTeam:"Mustangs FC", field:"6B", gameDate: "04-28-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2},
      {homeTeam:"Internationals", awayTeam:"KMP", field:"7B", gameDate: "04-28-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 2},

      {homeTeam:"Roadkill", awayTeam:"Blue City", field:"6B", gameDate: "05-05-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 3},
      {homeTeam:"Jolly Green Giants", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-05-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 3},
      {homeTeam:"Absinthe Minded", awayTeam:"Internationals", field:"6B", gameDate: "05-05-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 3},
      {homeTeam:"Mustangs FC", awayTeam:"Absinthe Minded", field:"6B", gameDate: "05-05-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 3},
      {homeTeam:"KMP", awayTeam:"Agony of Da Feet", field:"7A", gameDate: "05-05-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 3},

      {homeTeam:"Rusty Knights", awayTeam:"Roadkill", field:"6B", gameDate: "05-12-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 4},
      {homeTeam:"Internationals", awayTeam:"Blue City", field:"6B", gameDate: "05-12-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 4},
      {homeTeam:"Mustangs FC", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "05-12-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 4},
      {homeTeam:"KMP", awayTeam:"Mustangs FC", field:"6B", gameDate: "05-12-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 4},
      {homeTeam:"Absinthe Minded", awayTeam:"Agony of Da Feet", field:"7A", gameDate: "05-12-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 4},

      {homeTeam:"Roadkill", awayTeam:"Mustangs FC", field:"6B", gameDate: "05-19-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 5},
      {homeTeam:"Internationals", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-19-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 5},
      {homeTeam:"Absinthe Minded", awayTeam:"KMP", field:"6B", gameDate: "05-19-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 5},
      {homeTeam:"KMP", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "05-19-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 5},
      {homeTeam:"Blue City", awayTeam:"Agony of Da Feet", field:"7B", gameDate: "05-19-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 5},

      {homeTeam:"Jolly Green Giants", awayTeam:"Roadkill", field:"6B", gameDate: "05-26-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 6},
      {homeTeam:"Mustangs FC", awayTeam:"Internationals", field:"6B", gameDate: "05-26-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 6},
      {homeTeam:"Agony of Da Feet", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-26-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 6},
      {homeTeam:"Absinthe Minded", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-26-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 6},
      {homeTeam:"Blue City", awayTeam:"KMP", field:"7A", gameDate: "05-26-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 6},

      {homeTeam:"Agony of Da Feet", awayTeam:"Mustangs FC", field:"6B", gameDate: "06-02-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7},
      {homeTeam:"Rusty Knights", awayTeam:"KMP", field:"6B", gameDate: "06-02-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7},
      {homeTeam:"Internationals", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "06-02-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7},
      {homeTeam:"Roadkill", awayTeam:"Internationals", field:"6B", gameDate: "06-02-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7},
      {homeTeam:"Blue City", awayTeam:"Absinthe Minded", field:"7A", gameDate: "06-02-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, week: 7}
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
