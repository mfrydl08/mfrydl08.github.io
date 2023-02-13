import {Component, OnInit, ViewChild} from '@angular/core';
import {Standing} from "../models/standing";
import {Game} from "../models/game";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ScheduleService} from "../schedule/schedule.service";
import {MatSort} from "@angular/material/sort";
import {Teams} from "../models/teams";
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  public teamList: Teams[] = [];
  public standings: Standing[] = [];
  public games: Game[] = this.scheduleService.gameData;

  public dataSource = new MatTableDataSource(this.standings);

  public winMap: Map<String, number> = new Map<String, number>();
  public drawMap: Map<String, number> = new Map<String, number>();
  public loseMap: Map<String, number> = new Map<String, number>();
  public pointsMap: Map<String, number> = new Map<String, number>();
  public goalsScoredMap: Map<String, number> = new Map<String, number>();

  public week: number = 0;

  initColumns: any[] = [
    { name: 'teamName', display: 'Team' },
    { name: 'wins', display: 'Wins' },
    { name: 'draws', display: 'Draws' },
    { name: 'losses', display: 'Losses' },
    { name: 'points', display: 'Points' },
    { name: 'goalsScored', display: 'Goals Scored' },
  ];

  public displayedColumns: any[] = this.initColumns.map((col) => col.name);
  public pageSizes = [10, 20, 50, 100];

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatAccordion) acc: any = MatAccordion;

  constructor(public scheduleService: ScheduleService) {
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getTeams();
    this.getGameResults();
    this.getPoints();
    this.buildStandings();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public buildStandings() {
    this.teamList.forEach(team => {
      let teamInfo : Standing = new Standing();
      let wins = 0;
      let draws = 0;
      let losses = 0;
      let points = 0;
      let goalsScored = 0;
      if (this.winMap.has(team.teamName)) {
        // @ts-ignore
        wins = this.winMap.get(team.teamName);
      }
      if (this.drawMap.has(team.teamName)) {
        // @ts-ignore
        draws = this.drawMap.get(team.teamName);
      }
      if (this.loseMap.has(team.teamName)) {
        // @ts-ignore
        losses = this.loseMap.get(team.teamName);
      }
      if (this.pointsMap.has(team.teamName)) {
        // @ts-ignore
        points = this.pointsMap.get(team.teamName);
      }
      if (this.goalsScoredMap.has(team.teamName)) {
        // @ts-ignore
        goalsScored = this.goalsScoredMap.get(team.teamName);
      }

      teamInfo.teamName = team.teamName;
      teamInfo.wins = wins;
      teamInfo.draws = draws;
      teamInfo.losses = losses;
      teamInfo.points = points;
      teamInfo.goalsScored = goalsScored;
      this.standings.push(teamInfo);
    });
  }

  public getTeams() {
    this.teamList.push(
      {teamName:"Roadkill"},
      {teamName:"Internationals"},
      {teamName:"Blue City"},
      {teamName:"KMP"},
      {teamName:"Absinthe Minded"},
      {teamName:"Jolly Green Giants"},
      {teamName:"Agony of Da Feet"},
      {teamName:"Rusty Knights"}
    );

    this.teamList.sort((a,b) => a.teamName.localeCompare(b.teamName));
  }

  public getGameResults() {
    this.teamList.forEach(team => {
      this.games.forEach(game => {
        if (game.isScoreFinal && game.homeTeam.toLowerCase() == team.teamName.toLowerCase()) {
          this.getHomeResult(game.homeScore, game.awayScore, team.teamName);
          this.getHomeGoalsScored(game.homeScore, team.teamName);
        } else if (game.isScoreFinal && game.awayTeam.toLowerCase() == team.teamName.toLowerCase()) {
          this.getAwayResult(game.homeScore, game.awayScore, team.teamName);
          this.getAwayGoalsScored(game.awayScore, team.teamName);
        }
      });
    });

  }

  public getPoints() {
    this.teamList.forEach(team => {
      if (this.winMap.has(team.teamName)) {
        let wins = this.winMap.get(team.teamName);
        if (this.pointsMap.has(team.teamName)) {
        } else {
          // @ts-ignore
          this.pointsMap.set(team.teamName, wins * 3);
        }
      }
      if (this.drawMap.has(team.teamName)) {
        let draws = this.drawMap.get(team.teamName);
        let points = this.pointsMap.get(team.teamName);
        if (this.pointsMap.has(team.teamName)) {
          // @ts-ignore
          this.pointsMap.set(team.teamName, points + draws);
        } else {
          this.pointsMap.set(team.teamName, 0);
        }
      }
    });
  }

  public getAwayGoalsScored(awayScore: number, teamName: String) {
    if (this.goalsScoredMap.has(teamName)) {
      let val = this.goalsScoredMap.get(teamName);
      // @ts-ignore
      this.goalsScoredMap.set(teamName, val + awayScore);
    } else {
      this.goalsScoredMap.set(teamName, awayScore);
    }
  }

  public getHomeGoalsScored(homeScore: number, teamName: String) {
    if (this.goalsScoredMap.has(teamName)) {
      let val = this.goalsScoredMap.get(teamName);
      // @ts-ignore
      this.goalsScoredMap.set(teamName, val + homeScore);
    } else {
      this.goalsScoredMap.set(teamName, homeScore);
    }
  }

  public getAwayResult(homeScore: number, awayScore: number, teamName: String) {
    if (awayScore > homeScore) {
      if (this.winMap.has(teamName)) {
        let val = this.winMap.get(teamName);
        // @ts-ignore
        this.winMap.set(teamName, val + 1);
      } else {
        this.winMap.set(teamName, 1);
      }
    } else if (awayScore == homeScore) {
      if (this.drawMap.has(teamName)) {
        let val = this.drawMap.get(teamName);
        // @ts-ignore
        this.drawMap.set(teamName, val + 1);
      } else {
        this.drawMap.set(teamName, 1);
      }
    } else if (awayScore < homeScore) {
      if (this.loseMap.has(teamName)) {
        let val = this.loseMap.get(teamName);
        // @ts-ignore
        this.loseMap.set(teamName, val + 1);
      } else {
        this.loseMap.set(teamName, 1);
      }
    }
  }

  public getHomeResult(homeScore: number, awayScore: number, teamName: String) {
    if (homeScore > awayScore) {
      if (this.winMap.has(teamName)) {
        let val = this.winMap.get(teamName);
        // @ts-ignore
        this.winMap.set(teamName, val + 1);
      } else {
        this.winMap.set(teamName, 1);
      }
    } else if (homeScore == awayScore) {
      if (this.drawMap.has(teamName)) {
        let val = this.drawMap.get(teamName);
        // @ts-ignore
        this.drawMap.set(teamName, val + 1);
      } else {
        this.drawMap.set(teamName, 1);
      }
    } else if (homeScore < awayScore) {
      if (this.loseMap.has(teamName)) {
        let val = this.loseMap.get(teamName);
        // @ts-ignore
        this.loseMap.set(teamName, val + 1);
      } else {
        this.loseMap.set(teamName, 1);
      }
    }
  }
}
