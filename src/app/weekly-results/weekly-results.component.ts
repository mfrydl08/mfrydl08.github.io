import {Component, OnInit} from '@angular/core';
import {ScheduleService} from "../schedule/schedule.service";
import {WeeklyResult} from "../models/weeklyResult";
import {GameScore} from "../models/gameScore";

@Component({
  selector: 'app-weekly-results',
  templateUrl: './weekly-results.component.html',
  styleUrls: ['./weekly-results.component.css']
})
export class WeeklyResultsComponent implements OnInit {
  public results: any = [];
  public weeklyResults: WeeklyResult[] = [];
  public gameData = this.scheduleService.getGames();

  constructor(public scheduleService: ScheduleService) {
  }

  public ngOnInit() {
    this.scheduleService.getNumberOfWeeks();
    this.buildResults();
  }

  private buildResults() {
    for (let i = 1; i <= this.scheduleService.numberOfWeeks; i++) {
      let weekResults = new WeeklyResult();
      let gameScores: GameScore[] = [];

      this.gameData.forEach(game => {
        let gameScore = new GameScore();
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
    console.log("weeklyResults: " + JSON.stringify(this.weeklyResults));
  }
}
