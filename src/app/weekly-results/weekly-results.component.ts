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
  public results = [];
  public weeklyResults: WeeklyResult[] = [];
  public gameData = this.scheduleService.gameData;

  constructor(public scheduleService: ScheduleService) {
  }

  public ngOnInit() {
    // this.scheduleService.getNumberOfWeeks();
    this.buildResults();
  }

  private buildResults() {
    const numberOfWeeks =  this.scheduleService.getNumberOfWeeks();
    console.log("numberOfWeeks: " + numberOfWeeks);

    for (let i = 1; i <= numberOfWeeks; i++) {
      const weekResults = new WeeklyResult();
      const gameScores: GameScore[] = [];

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
