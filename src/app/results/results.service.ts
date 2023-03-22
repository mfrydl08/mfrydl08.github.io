import {Injectable, OnDestroy} from '@angular/core';
import {Game} from "../models/game";
import {Result} from "../models/result";
import {ScheduleService} from "../schedule/schedule.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResultsService implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private ROADKILL = 'roadkill';
  public games: Game[] = [];

  constructor(public scheduleService: ScheduleService) {
  }

  public getGames() {
    this.games = [];
    this.games = this.scheduleService.gameData;
  }

  public getAllResults(): Result[] {
    const results: Result[] = [];

    this.games.forEach(game => {
      const result = new Result();

      if (game.isScoreFinal) {
        result.win = this.isWin(game.homeTeam, game.homeScore, game.awayScore);
        result.draw = this.isDraw(game.homeScore, game.awayScore);
        result.loss = this.isLoss(game.homeTeam, game.homeScore, game.awayScore);
        result.gameInfo = game;
        results.push(result);
      }
    });

    return results;
  }

  public isWin(homeTeam: string, homeScore: number, awayScore: number): boolean {
    let isWin;
    if (homeTeam.toLowerCase() == this.ROADKILL) {
      isWin = (homeScore > awayScore);
      } else {
      isWin = (awayScore > homeScore);
    }

    return isWin;
  }

  public isDraw(homeScore: number, awayScore: number): boolean {
    return (homeScore == awayScore);
  }

  public isLoss(homeTeam: string, homeScore: number, awayScore: number): boolean {
    let isLoss;
    if (homeTeam.toLowerCase() == this.ROADKILL) {
      isLoss = (homeScore < awayScore);
    } else {
      isLoss = (awayScore < homeScore);
    }

    return isLoss;
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
