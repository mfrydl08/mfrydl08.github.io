import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScheduleService} from "../schedule/schedule.service";
import {WeeklyResult} from "../models/weeklyResult";
import {GameScore} from "../models/gameScore";
import {AppService} from "../app.service";
import {Game} from "../models/game";

@Component({
  selector: 'app-weekly-results',
  templateUrl: './weekly-results.component.html',
  styleUrls: ['./weekly-results.component.css']
})
export class WeeklyResultsComponent implements OnInit, OnChanges {
  @Input() selectedSessionValue: string | undefined;
  public results = [];
  public weeklyResults: WeeklyResult[] = [];
  public gameData: Game[] = [];

  constructor(public appService: AppService,
              public scheduleService: ScheduleService) {
  }

  public ngOnInit() {
    this.buildResults();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.buildResults();
  }

  public buildResults() {
    const numberOfWeeks =  this.scheduleService.getNumberOfWeeksBySelectedSessionValue(this.appService.selectedSessionValue);
    this.weeklyResults = [];
    this.gameData = [];

    for (let i = 1; i <= numberOfWeeks; i++) {
      const weekResults = new WeeklyResult();
      const gameScores: GameScore[] = [];

      this.gameData = this.scheduleService.getGamesBySelectedSessionValue(this.appService.selectedSessionValue);
      this.gameData.forEach(game => {
        const gameScore = new GameScore();
        if (game.week == i && game.isScoreFinal) {
          gameScore.homeTeam = game.homeTeam;
          gameScore.awayTeam = game.awayTeam;
          gameScore.homeScore = game.homeScore;
          gameScore.awayScore = game.awayScore;
          gameScores.push(gameScore);
        }
      });

      weekResults.week = i;
      weekResults.gameScores = gameScores;
      this.weeklyResults.push(weekResults);
    }
  }
}
