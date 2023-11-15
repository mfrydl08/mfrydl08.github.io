import {Injectable} from '@angular/core';
import {Game} from "../models/game";
import {AppService} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  public gameData: Game[]= [];
  public appService;
  public sessionVal: string | undefined;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(appService: AppService) {
    this.appService = appService;
    this.sessionVal = this.appService.selectedSessionValue;
    this.gameData = this.getGamesBySelectedSessionValue(this.appService.selectedSessionValue);
  }

  public getGamesBySelectedSessionAndDivisionValue(selectedSessionValue: string, selectedDivisionValue: string): Game[] {
    const gamesList: Game[] = [];
    const games: Game[] = this.getGamesBySelectedSessionValue(selectedSessionValue);

    games.forEach(game => {
      if (game.division === selectedDivisionValue) {
        gamesList.push(game);
      }
    });

    return gamesList;
  }

  public getGamesBySelectedSessionValue(selectedSessionValue: string): Game[] {
    const games: Game[] = [];
    const gameData = [
      {homeTeam:"Jolly Green Giants", awayTeam:"Absinthe Minded", field:"6B", gameDate: "04-21-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 8, awayScore: 4, session: "0", week: 1, status: "", division: "1"},
      {homeTeam:"KMP", awayTeam:"Roadkill", field:"6B", gameDate: "04-21-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 3, awayScore: 4, session: "0", week: 1, status: "", division: "1"},
      {homeTeam:"Mustangs FC", awayTeam:"Blue City", field:"6B", gameDate: "04-21-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 1, awayScore: 2, session: "0", week: 1, status: "", division: "1"},
      {homeTeam:"Rusty Knights", awayTeam:"Blue City", field:"6B", gameDate: "04-21-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 4, awayScore: 9, session: "0", week: 1, status: "", division: "1"},
      {homeTeam:"Agony of Da Feet", awayTeam:"Internationals", field:"7B", gameDate: "04-21-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 2, awayScore: 6, session: "0", week: 1, status: "", division: "1"},

      {homeTeam:"Blue City", awayTeam:"Jolly Green Giants", field:"Ballenger Creek Park: Foreman Field A", gameDate: "06-09-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 7, awayScore: 2, session: "0", week: 2, status: "Rescheduled", division: "1"},
      {homeTeam:"Jolly Green Giants", awayTeam:"Agony of Da Feet", field:"Ballenger Creek Park: Foreman Field A", gameDate: "06-09-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 3, awayScore: 5, session: "0", week: 2, status: "Rescheduled", division: "1"},
      {homeTeam:"Rusty Knights", awayTeam:"Mustangs FC", field:"Ballenger Creek Park: Foreman Field B", gameDate: "06-09-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 0, awayScore: 3, session: "0", week: 2, status: "Rescheduled", division: "1"},
      {homeTeam:"Agony of Da Feet", awayTeam:"Roadkill", field:"Ballenger Creek Park: Foreman Field A", gameDate: "06-09-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 2, awayScore: 3, session: "0", week: 2, status: "Rescheduled", division: "1"},
      {homeTeam:"Internationals", awayTeam:"KMP", field:"Ballenger Creek Park: Foreman Field B", gameDate: "06-09-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 4, awayScore: 1, session: "0", week: 2, status: "Rescheduled", division: "1"},
      {homeTeam:"Roadkill", awayTeam:"Absinthe Minded", field:"Ballenger Creek Park: Foreman Field B", gameDate: "06-09-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 2, awayScore: 0, session: "0", week: 2, status: "Rescheduled", division: "1"},

      {homeTeam:"Roadkill", awayTeam:"Blue City", field:"6B", gameDate: "05-05-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 4, awayScore: 8, session: "0", week: 3, status: "", division: "1"},
      {homeTeam:"Jolly Green Giants", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-05-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 6, awayScore: 2, session: "0", week: 3, status: "", division: "1"},
      {homeTeam:"Absinthe Minded", awayTeam:"Internationals", field:"6B", gameDate: "05-05-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 3, awayScore: 4, session: "0", week: 3, status: "", division: "1"},
      {homeTeam:"Mustangs FC", awayTeam:"Absinthe Minded", field:"6B", gameDate: "05-05-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 4, awayScore: 3, session: "0", week: 3, status: "", division: "1"},
      {homeTeam:"KMP", awayTeam:"Agony of Da Feet", field:"7A", gameDate: "05-05-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 3, awayScore: 3, session: "0", week: 3, status: "", division: "1"},

      {homeTeam:"Rusty Knights", awayTeam:"Roadkill", field:"6B", gameDate: "05-12-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 0, awayScore: 5, session: "0", week: 4, status: "", division: "1"},
      {homeTeam:"Internationals", awayTeam:"Blue City", field:"6B", gameDate: "05-12-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 4, awayScore: 7, session: "0", week: 4, status: "", division: "1"},
      {homeTeam:"Mustangs FC", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "05-12-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 9, awayScore: 3, session: "0", week: 4, status: "", division: "1"},
      {homeTeam:"KMP", awayTeam:"Mustangs FC", field:"6B", gameDate: "05-12-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 2, awayScore: 12, session: "0", week: 4, status: "", division: "1"},
      {homeTeam:"Absinthe Minded", awayTeam:"Agony of Da Feet", field:"7A", gameDate: "05-12-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 3, awayScore: 3, session: "0", week: 4, status: "", division: "1"},

      {homeTeam:"Roadkill", awayTeam:"Mustangs FC", field:"6B", gameDate: "05-19-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 2, awayScore: 7, session: "0", week: 5, status: "", division: "1"},
      {homeTeam:"Internationals", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-19-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 5, awayScore: 2, session: "0", week: 5, status: "", division: "1"},
      {homeTeam:"Absinthe Minded", awayTeam:"KMP", field:"6B", gameDate: "05-19-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 2, awayScore: 4, session: "0", week: 5, status: "", division: "1"},
      {homeTeam:"KMP", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "05-19-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 3, awayScore: 4, session: "0", week: 5, status: "", division: "1"},
      {homeTeam:"Blue City", awayTeam:"Agony of Da Feet", field:"7B", gameDate: "05-19-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 11, awayScore: 3, session: "0", week: 5, status: "", division: "1"},

      {homeTeam:"Jolly Green Giants", awayTeam:"Roadkill", field:"6B", gameDate: "05-26-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 9, awayScore: 7, session: "0", week: 6, status: "", division: "1"},
      {homeTeam:"Mustangs FC", awayTeam:"Internationals", field:"6B", gameDate: "05-26-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 5, awayScore: 4, session: "0", week: 6, status: "", division: "1"},
      {homeTeam:"Agony of Da Feet", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-26-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 4, awayScore: 1, session: "0", week: 6, status: "", division: "1"},
      {homeTeam:"Absinthe Minded", awayTeam:"Rusty Knights", field:"6B", gameDate: "05-26-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 5, awayScore: 1, session: "0", week: 6, status: "", division: "1"},
      {homeTeam:"Blue City", awayTeam:"KMP", field:"7A", gameDate: "05-26-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 8, awayScore: 3, session: "0", week: 6, status: "", division: "1"},

      {homeTeam:"Agony of Da Feet", awayTeam:"Mustangs FC", field:"6B", gameDate: "06-02-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 3, awayScore: 8, session: "0", week: 7, status: "", division: "1"},
      {homeTeam:"Rusty Knights", awayTeam:"KMP", field:"6B", gameDate: "06-02-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 1, awayScore: 8, session: "0", week: 7, status: "", division: "1"},
      {homeTeam:"Internationals", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "06-02-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 5, awayScore: 4, session: "0", week: 7, status: "", division: "1"},
      {homeTeam:"Roadkill", awayTeam:"Internationals", field:"6B", gameDate: "06-02-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 2, awayScore: 7, session: "0", week: 7, status: "", division: "1"},
      {homeTeam:"Blue City", awayTeam:"Absinthe Minded", field:"7A", gameDate: "06-02-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 10, awayScore: 1, session: "0", week: 7, status: "", division: "1"},

      {homeTeam:"Absinthe Minded", awayTeam:"Rusty Knights", field:"7A", gameDate: "06-16-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "0", week: 8, status: "Playoffs", division: "1"},
      {homeTeam:"Mustangs FC", awayTeam:"KMP", field:"7A", gameDate: "06-16-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "0", week: 8, status: "Playoffs", division: "1"},
      {homeTeam:"Blue City", awayTeam:"Absinthe Minded/Rusty Knights", field:"7A", gameDate: "06-16-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "0", week: 8, status: "Playoffs", division: "1"},
      {homeTeam:"Internationals", awayTeam:"Agony of Da Feet", field:"7B", gameDate: "06-16-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "0", week: 8, status: "Playoffs", division: "1"},
      {homeTeam:"Jolly Green Giants", awayTeam:"Roadkill", field:"7A", gameDate: "06-16-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "0", week: 8, status: "Playoffs", division: "1"},

      {homeTeam:"Blue City", awayTeam:"Roadkill", field:"6A", gameDate: "06-23-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "0", week: 9, status: "Semifinal", division: "1"},
      {homeTeam:"Agony of Da Feet", awayTeam:"Mustangs FC", field:"6b", gameDate: "06-23-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "0", week: 9, status: "Semifinal", division: "1"},

      {homeTeam:"TBD", awayTeam:"TBD", field:"68", gameDate: "06-23-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "0", week: 9, status: "Final", division: "1"},

      {homeTeam:"Rusty Knights", awayTeam:"FC Frederick Aces", field:"6A", gameDate: "07-07-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 4, awayScore: 5, session: "1", week: 1, status: "", division: "1"},
      {homeTeam:"Blue City", awayTeam:"KMP", field:"7A", gameDate: "07-07-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 13, awayScore: 4, session: "1", week: 1, status: "", division: "1"},
      {homeTeam:"Agony of Da Feet", awayTeam:"Mustangs FC", field:"6A", gameDate: "07-07-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 3, awayScore: 2, session: "1", week: 1, status: "", division: "1"},
      {homeTeam:"Roadkill", awayTeam:"Jolly Green Giants", field:"7A", gameDate: "07-07-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 5, awayScore: 4, session: "1", week: 1, status: "", division: "1"},
      {homeTeam:"Internationals", awayTeam:"Absinthe Minded", field:"6A", gameDate: "07-07-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 1, awayScore: 3, session: "1", week: 1, status: "", division: "1"},

      {homeTeam:"Absinthe Minded", awayTeam:"Roadkill", field:"6A", gameDate: "07-14-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 1, awayScore: 6, session: "1", week: 2, status: "", division: "1"},
      {homeTeam:"Jolly Green Giants", awayTeam:"Rusty Knights", field:"7A", gameDate: "07-14-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 9, awayScore: 2, session: "1", week: 2, status: "", division: "1"},
      {homeTeam:"FC Frederick Aces", awayTeam:"Mustangs FC", field:"6A", gameDate: "07-14-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 0, awayScore: 3, session: "1", week: 2, status: "", division: "1"},
      {homeTeam:"Internationals", awayTeam:"Blue City", field:"7A", gameDate: "07-14-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 3, awayScore: 9, session: "1", week: 2, status: "", division: "1"},
      {homeTeam:"KMP", awayTeam:"Agony of Da Feet", field:"6A", gameDate: "07-14-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 2, awayScore: 3, session: "1", week: 2, status: "", division: "1"},

      {homeTeam:"Agony of Da Feet", awayTeam:"Internationals", field:"6A", gameDate: "07-21-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 2, awayScore: 1, session: "1", week: 3, status: "", division: "1"},
      {homeTeam:"Jolly Green Giants", awayTeam:"FC Frederick Aces", field:"7A", gameDate: "07-21-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 11, awayScore: 5, session: "1", week: 3, status: "", division: "1"},
      {homeTeam:"Rusty Knights", awayTeam:"Absinthe Minded", field:"6A", gameDate: "07-21-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 5, awayScore: 5, session: "1", week: 3, status: "", division: "1"},
      {homeTeam:"Mustangs FC", awayTeam:"KMP", field:"7A", gameDate: "07-21-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 14, awayScore: 1, session: "1", week: 3, status: "", division: "1"},
      {homeTeam:"Roadkill", awayTeam:"Blue City", field:"6A", gameDate: "07-21-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 1, awayScore: 9, session: "1", week: 3, status: "", division: "1"},

      {homeTeam:"Mustangs FC", awayTeam:"Internationals", field:"6A", gameDate: "09-01-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 4, awayScore: 4, session: "1", week: 4, status: "", division: "1"},
      {homeTeam:"Roadkill", awayTeam:"Agony of Da Feet", field:"7A", gameDate: "09-01-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 2, awayScore: 5, session: "1", week: 4, status: "", division: "1"},
      {homeTeam:"Absinthe Minded", awayTeam:"Jolly Green Giants", field:"6A", gameDate: "09-01-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 5, awayScore: 6, session: "1", week: 4, status: "", division: "1"},
      {homeTeam:"Blue City", awayTeam:"Rusty Knights", field:"7A", gameDate: "09-01-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 9, awayScore: 4, session: "1", week: 4, status: "", division: "1"},
      {homeTeam:"FC Frederick Aces", awayTeam:"KMP", field:"6A", gameDate: "09-01-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 4, awayScore: 9, session: "1", week: 4, status: "", division: "1"},

      {homeTeam:"Mustangs FC", awayTeam:"Roadkill", field:"6A", gameDate: "08-04-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 6, awayScore: 4, session: "1", week: 5, status: "", division: "1"},
      {homeTeam:"Jolly Green Giants", awayTeam:"Blue City", field:"7A", gameDate: "08-04-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 2, awayScore: 7, session: "1", week: 5, status: "", division: "1"},
      {homeTeam:"Absinthe Minded", awayTeam:"FC Frederick Aces", field:"6A", gameDate: "08-04-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 6, awayScore: 3, session: "1", week: 5, status: "", division: "1"},
      {homeTeam:"KMP", awayTeam:"Internationals", field:"7A", gameDate: "08-04-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 0, awayScore: 12, session: "1", week: 5, status: "", division: "1"},
      {homeTeam:"Rusty Knights", awayTeam:"Agony of Da Feet", field:"7A", gameDate: "09-01-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 6, awayScore: 4, session: "1", week: 5, status: "Rescheduled", division: "1"},

      {homeTeam:"FC Frederick Aces", awayTeam:"Internationals", field:"6A", gameDate: "08-11-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 3, awayScore: 8, session: "1", week: 6, status: "", division: "1"},
      {homeTeam:"Blue City", awayTeam:"Absinthe Minded", field:"7A", gameDate: "08-11-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 14, awayScore: 1, session: "1", week: 6, status: "", division: "1"},
      {homeTeam:"Roadkill", awayTeam:"KMP", field:"6A", gameDate: "08-11-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 7, awayScore: 1, session: "1", week: 6, status: "", division: "1"},
      {homeTeam:"Agony of Da Feet", awayTeam:"Jolly Green Giants", field:"7A", gameDate: "08-11-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 5, awayScore: 4, session: "1", week: 6, status: "", division: "1"},
      {homeTeam:"Rusty Knights", awayTeam:"Mustangs FC", field:"6A", gameDate: "08-11-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 3, awayScore: 13, session: "1", week: 6, status: "", division: "1"},

      {homeTeam:"KMP", awayTeam:"Rusty Knights", field:"6A", gameDate: "08-18-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 9, awayScore: 8, session: "1", week: 7, status: "", division: "1"},
      {homeTeam:"Absinthe Minded", awayTeam:"Agony of Da Feet", field:"7A", gameDate: "08-18-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 3, awayScore: 9, session: "1", week: 7, status: "", division: "1"},
      {homeTeam:"Jolly Green Giants", awayTeam:"Mustangs FC", field:"6A", gameDate: "08-18-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 5, awayScore: 6, session: "1", week: 7, status: "", division: "1"},
      {homeTeam:"Internationals", awayTeam:"Roadkill", field:"7A", gameDate: "08-18-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 5, awayScore: 4, session: "1", week: 7, status: "", division: "1"},
      {homeTeam:"Blue City", awayTeam:"FC Frederick Aces", field:"6A", gameDate: "08-18-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 9, awayScore: 4, session: "1", week: 7, status: "", division: "1"},

      {homeTeam:"Internationals", awayTeam:"Roadkill", field:"6A", gameDate: "09-08-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "1", week: 8, status: "Quarter-Final 2", division: "1"},
      {homeTeam:"Mustangs FC", awayTeam:"Jolly Green Giants", field:"6B", gameDate: "09-08-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "1", week: 8, status: "Quarter-Final 4", division: "1"},
      {homeTeam:"KMP", awayTeam:"Rusty Knights", field:"6A", gameDate: "09-08-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "1", week: 8, status: "Play-in 1", division: "1"},
      {homeTeam:"Absinthe Minded", awayTeam:"FC Frederick Aces", field:"6B", gameDate: "09-08-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "1", week: 8, status: "Play-in 2", division: "1"},
      {homeTeam:"Blue City", awayTeam:"Winner  Play-in 1", field:"6A", gameDate: "09-08-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "1", week: 8, status: "Quarter-Final 1", division: "1"},
      {homeTeam:"Agony of Da Feet", awayTeam:"Winner Play-in 2", field:"6B", gameDate: "09-08-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "1", week: 8, status: "Quarter-Final 3", division: "1"},

      {homeTeam:"Winner QF 1", awayTeam:"Winner QF 2", field:"6A", gameDate: "09-15-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "1", week: 9, status: "Semi-Final 1", division: "1"},
      {homeTeam:"QF 3 Winner", awayTeam:"QF 4", field:"6B", gameDate: "09-15-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "1", week: 9, status: "Semi-Final 2", division: "1"},

      {homeTeam:"Winner SF 1", awayTeam:"Winner SF 2", field:"6B", gameDate: "09-15-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "1", week: 10, status: "Final", division: "1"},

      {homeTeam:"Point of Rocks", awayTeam:"Jolly Green Giants", field:"7A", gameDate: "09-29-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 6, awayScore: 6, session: "2", week: 1, status: "", division: "2"},
      {homeTeam:"Rusty Knights", awayTeam:"Roadkill", field:"7A", gameDate: "09-29-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 5, awayScore: 6, session: "2", week: 1, status: "", division: "2"},
      {homeTeam:"KMP", awayTeam:"Frederick Aces", field:"7A", gameDate: "09-29-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 3, awayScore: 3, session: "2", week: 1, status: "", division: "2"},
      {homeTeam:"KMP", awayTeam:"Internationals", field:"7A", gameDate: "09-29-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 5, awayScore: 4, session: "2", week: 1, status: "", division: "2"},
      {homeTeam:"Blue City", awayTeam:"Mustang", field:"7B", gameDate: "09-29-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 8, awayScore: 4, session: "2", week: 1, status: "", division: "1"},
      {homeTeam:"Absinthe Minded", awayTeam:"Agony of Da Feet", field:"7B", gameDate: "09-29-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 2, awayScore: 3, session: "2", week: 1, status: "", division: "1"},

      {homeTeam:"Internationals", awayTeam:"Rusty Knights", field:"7A", gameDate: "10-06-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 9, awayScore: 2, session: "2", week: 2, status: "", division: "2"},
      {homeTeam:"Roadkill", awayTeam:"Jolly Green Giants", field:"7A", gameDate: "10-06-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 6, awayScore: 4, session: "2", week: 2, status: "", division: "2"},
      {homeTeam:"Frederick Aces", awayTeam:"Point of Rocks", field:"7A", gameDate: "10-06-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 6, awayScore: 4, session: "2", week: 2, status: "", division: "2"},
      {homeTeam:"Frederick Aces", awayTeam:"KMP", field:"7A", gameDate: "10-06-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 4, awayScore: 2, session: "2", week: 2, status: "", division: "2"},
      {homeTeam:"Agony of Da Feet", awayTeam:"Blue City", field:"6B", gameDate: "10-06-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 3, awayScore: 7, session: "2", week: 2, status: "", division: "1"},
      {homeTeam:"Absinthe Minded", awayTeam:"Mustang", field:"6B", gameDate: "10-06-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 1, awayScore: 2, session: "2", week: 2, status: "", division: "1"},

      {homeTeam:"Roadkill", awayTeam:"Frederick Aces", field:"7A", gameDate: "10-13-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 2, awayScore: 4, session: "2", week: 3, status: "", division: "2"},
      {homeTeam:"Point of Rocks", awayTeam:"KMP", field:"7A", gameDate: "10-13-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 6, awayScore: 5, session: "2", week: 3, status: "", division: "2"},
      {homeTeam:"Internationals", awayTeam:"Jolly Green Giants", field:"7A", gameDate: "10-13-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 6, awayScore: 4, session: "2", week: 3, status: "", division: "2"},
      {homeTeam:"Rusty Knights", awayTeam:"Internationals", field:"7A", gameDate: "10-13-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 2, awayScore: 6, session: "2", week: 3, status: "", division: "2"},
      {homeTeam:"Mustang", awayTeam:"Agony of Da Feet", field:"7B", gameDate: "10-13-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 4, awayScore: 1, session: "2", week: 3, status: "", division: "1"},
      {homeTeam:"Blue City", awayTeam:"Absinthe Minded", field:"7B", gameDate: "10-13-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 7, awayScore: 1, session: "2", week: 3, status: "", division: "1"},

      {homeTeam:"KMP", awayTeam:"Roadkill", field:"6A", gameDate: "10-20-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 4, awayScore: 3, session: "2", week: 4, status: "", division: "2"},
      {homeTeam:"Frederick Aces", awayTeam:"Internationals", field:"6A", gameDate: "10-20-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 4, awayScore: 4, session: "2", week: 4, status: "", division: "2"},
      {homeTeam:"Jolly Green Giants", awayTeam:"Rusty Knights", field:"6A", gameDate: "10-20-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 6, awayScore: 3, session: "2", week: 4, status: "", division: "2"},
      {homeTeam:"Jolly Green Giants", awayTeam:"Point of Rocks", field:"6A", gameDate: "10-20-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 5, awayScore: 5, session: "2", week: 4, status: "", division: "2"},
      {homeTeam:"Agony of Da Feet", awayTeam:"Absinthe Minded", field:"6B", gameDate: "10-20-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 3, awayScore: 0, session: "2", week: 4, status: "", division: "1"},
      {homeTeam:"Mustang", awayTeam:"Blue City", field:"6B", gameDate: "10-20-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 0, awayScore: 3, session: "2", week: 4, status: "", division: "1"},

      {homeTeam:"Frederick Aces", awayTeam:"Rusty Knights", field:"7A", gameDate: "10-27-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 5, awayScore: 3, session: "2", week: 5, status: "", division: "2"},
      {homeTeam:"Internationals", awayTeam:"KMP", field:"7A", gameDate: "10-27-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 6, awayScore: 1, session: "2", week: 5, status: "", division: "2"},
      {homeTeam:"Roadkill", awayTeam:"Point of Rocks", field:"7A", gameDate: "10-27-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 5, awayScore: 2, session: "2", week: 5, status: "", division: "2"},
      {homeTeam:"Jolly Green Giants", awayTeam:"Roadkill", field:"7A", gameDate: "10-27-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 4, awayScore: 5, session: "2", week: 5, status: "", division: "2"},
      {homeTeam:"Mustang", awayTeam:"Absinthe Minded", field:"7B", gameDate: "10-27-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 5, awayScore: 1, session: "2", week: 5, status: "", division: "1"},
      {homeTeam:"Blue City", awayTeam:"Agony of Da Feet", field:"7B", gameDate: "10-27-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 8, awayScore: 2, session: "2", week: 5, status: "", division: "1"},

      {homeTeam:"Jolly Green Giants", awayTeam:"Frederick Aces", field:"6A", gameDate: "11-03-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 3, awayScore: 3, session: "2", week: 6, status: "", division: "2"},
      {homeTeam:"Point of Rocks", awayTeam:"Internationals", field:"6A", gameDate: "11-03-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 4, awayScore: 5, session: "2", week: 6, status: "", division: "2"},
      {homeTeam:"Rusty Knights", awayTeam:"KMP", field:"6A", gameDate: "11-03-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 3, awayScore: 0, session: "2", week: 6, status: "", division: "2"},
      {homeTeam:"Roadkill", awayTeam:"Rusty Knights", field:"6A", gameDate: "11-03-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 8, awayScore: 5, session: "2", week: 6, status: "", division: "2"},
      {homeTeam:"Absinthe Minded", awayTeam:"Blue City", field:"6B", gameDate: "11-03-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 2, awayScore: 7, session: "2", week: 6, status: "", division: "1"},
      {homeTeam:"Agony of Da Feet", awayTeam:"Mustang", field:"6B", gameDate: "11-03-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 3, awayScore: 4, session: "2", week: 6, status: "", division: "1"},

      {homeTeam:"Internationals", awayTeam:"Roadkill", field:"7A", gameDate: "11-10-2023", gameTime: "6:00", isScoreFinal: true, homeScore: 2, awayScore: 3, session: "2", week: 7, status: "", division: "2"},
      {homeTeam:"KMP", awayTeam:"Jolly Green Giants", field:"7A", gameDate: "11-10-2023", gameTime: "7:00", isScoreFinal: true, homeScore: 2, awayScore: 8, session: "2", week: 7, status: "", division: "2"},
      {homeTeam:"Rusty Knights", awayTeam:"Point of Rocks", field:"7A", gameDate: "11-10-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 1, awayScore: 3, session: "2", week: 7, status: "", division: "2"},
      {homeTeam:"Point of Rocks", awayTeam:"Frederick Aces", field:"7A", gameDate: "11-10-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 0, awayScore: 3, session: "2", week: 7, status: "", division: "2"},
      {homeTeam:"Blue City", awayTeam:"Mustang", field:"7B", gameDate: "11-10-2023", gameTime: "8:00", isScoreFinal: true, homeScore: 6, awayScore: 1, session: "2", week: 7, status: "", division: "1"},
      {homeTeam:"Absinthe Minded", awayTeam:"Agony of Da Feet", field:"7B", gameDate: "11-10-2023", gameTime: "9:00", isScoreFinal: true, homeScore: 7, awayScore: 6, session: "2", week: 7, status: "", division: "1"},

      {homeTeam:"Blue City", awayTeam:"Absinthe Minded", field:"7A", gameDate: "11-17-2023", gameTime: "6:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "2", week: 8, status: "Semifinal 1", division: "1"},
      {homeTeam:"Mustang", awayTeam:"Agony of Da Feet", field:"7A", gameDate: "11-17-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "2", week: 8, status: "Semifinal 2", division: "2"},
      {homeTeam:"Jolly Green Giants", awayTeam:"Point of Rocks", field:"7B", gameDate: "11-17-2023", gameTime: "7:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "2", week: 8, status: "Quarterfinal 1", division: "2"},
      {homeTeam:"Roadkill", awayTeam:"Rusty Knights", field:"7B", gameDate: "11-17-2023", gameTime: "8:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "2", week: 8, status: "Quarterfinal 2", division: "2"},
      {homeTeam:"Internationals", awayTeam:"KMP", field:"7B", gameDate: "11-17-2023", gameTime: "9:00", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "2", week: 8, status: "Quarterfinal 3", division: "2"},

      {homeTeam:"Winner SF 1", awayTeam:"Winner SF 2", field:"TBD", gameDate: "12-01-2023", gameTime: "TBD", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "2", week: 9, status: "Final", division: "2"},
      {homeTeam:"Frederick Aces", awayTeam:"Winner QF 1", field:"TBD", gameDate: "12-01-2023", gameTime: "TBD", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "2", week: 9, status: "Semifinal 1", division: "2"},
      {homeTeam:"Winner QF 2", awayTeam:"Winner QF 3", field:"TBD", gameDate: "12-01-2023", gameTime: "TBD", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "2", week: 9, status: "Semifinal 2", division: "2"},
      {homeTeam:"Winner SF 1", awayTeam:"Winner SF 2", field:"TBD", gameDate: "12-01-2023", gameTime: "TBD", isScoreFinal: false, homeScore: 0, awayScore: 0, session: "2", week: 9, status: "Final", division: "2"},


    ];

    gameData.forEach(game => {
      if (game.isScoreFinal && game.session == selectedSessionValue) {
        games.push(game);
      }
    })

    return games;
  }

  public getNumberOfWeeksBySelectedSessionValue(selectedSessionValue: string): number {
    let numberOfWeeks = 0;

    const gameData = this.getGamesBySelectedSessionValue(selectedSessionValue);

    gameData.forEach(game => {
      if (game.session == selectedSessionValue && game.week != numberOfWeeks) {
        numberOfWeeks++;
      }
    });

    return numberOfWeeks;
  }
}
