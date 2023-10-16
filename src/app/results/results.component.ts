import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ResultsService} from "./results.service";
import {Result} from "../models/result";
import {Subject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Game} from "../models/game";
import {MatPaginator} from "@angular/material/paginator";
import { MatTableFilter } from 'mat-table-filter';
import {ScheduleService} from "../schedule/schedule.service";
import {MatSort} from "@angular/material/sort";
import {AppService} from "../app.service";
import {Teams} from "../models/teams";
import {StandingsService} from "../standings/standings.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements AfterViewInit, OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private ROADKILL = "ROADKILL";

  public position = "";
  public selectedDivisionValue = '2';

  public wins = 0;
  public draws = 0;
  public losses = 0;
  public points = 0;

  public drawMap: Map<string, number> = new Map<string, number>();
  public loseMap: Map<string, number> = new Map<string, number>();
  public pointsMap: Map<string, number> = new Map<string, number>();
  public winMap: Map<string, number> = new Map<string, number>();

  public filterEntity: Game = new Game();

  public games: Game[] = [];
  public gamesList: Game[] = [];
  public results: Result[] = [];
  public teamList: Teams[] = [];

  public filterType = MatTableFilter.ANYWHERE;
  public dataSource = new MatTableDataSource(this.gamesList);

  initColumns = [
    { name: 'week', display: 'Week' },
    { name: 'gameDate', display: 'Game Date' },
    { name: 'homeTeam', display: 'Home Team' },
    { name: 'awayTeam', display: 'Away Team' },
    { name: 'homeScore', display: 'Home Score' },
    { name: 'awayScore', display: 'Away Score' },
  ];

  public displayedColumns = this.initColumns.map((col) => col.name);
  public pageSizes = [20, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(public appService: AppService,
              public resultsService: ResultsService,
              public scheduleService: ScheduleService,
              public standingsService: StandingsService) {
  }

 public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
 }

  public ngOnInit() {
    this.dataSource.sort = this.sort;

    // this.filterEntity = new Game();
    // this.filterType = MatTableFilter.ANYWHERE;

    this.initData();
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private initData() {
    if (this.selectedDivisionValue==='1') {
      this.teamList = this.standingsService.getTeamsListD1();
    } else {
      this.teamList = this.standingsService.getTeamsListD2();
    }

    this.games = this.scheduleService.getGamesBySelectedSessionValue(this.appService.selectedSessionValue);

    this.points = 0;
    this.wins = 0;
    this.draws = 0;
    this.losses = 0;

    this.winMap.clear();
    this.loseMap.clear();
    this.drawMap.clear();
    this.pointsMap.clear();

    this.resultsService.getGames();
    this.results = [];
    this.results = this.resultsService.getAllResults();

    this.results.forEach(result => {
      if (result.gameInfo.homeTeam.toUpperCase() == this.ROADKILL || result.gameInfo.awayTeam.toUpperCase() == this.ROADKILL) {
        if (result.win) {
          this.wins++;
        } else if (result.draw) {
          this.draws++;
        } else {
          this.losses++;
        }
      }
    });

    this.points = 3 * this.wins + this.draws;

    this.getGameResults();
    this.getPoints();
    this.getRoadkillPosition();

    this.dataSource = new MatTableDataSource(this.gamesList);
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getAwayResult(homeScore: number, awayScore: number, teamName: string) {
    if (awayScore > homeScore) {
      if (this.winMap.has(teamName)) {
        const wins = <number> this.winMap.get(teamName);
        this.winMap.set(teamName, wins + 1);
      } else {
        this.winMap.set(teamName, 1);
      }
    } else if (awayScore == homeScore) {
      if (this.drawMap.has(teamName)) {
        const draws = <number> this.drawMap.get(teamName);
        this.drawMap.set(teamName, draws + 1);
      } else {
        this.drawMap.set(teamName, 1);
      }
    } else if (awayScore < homeScore) {
      if (this.loseMap.has(teamName)) {
        const losses = <number> this.loseMap.get(teamName);
        this.loseMap.set(teamName, losses + 1);
      } else {
        this.loseMap.set(teamName, 1);
      }
    }
  }

  public getHomeResult(homeScore: number, awayScore: number, teamName: string) {
    if (homeScore > awayScore) {
      if (this.winMap.has(teamName)) {
        const wins = <number> this.winMap.get(teamName);
        this.winMap.set(teamName, wins + 1);
      } else {
        this.winMap.set(teamName, 1);
      }
    } else if (homeScore == awayScore) {
      if (this.drawMap.has(teamName)) {
        const draws = <number> this.drawMap.get(teamName);
        this.drawMap.set(teamName, draws + 1);
      } else {
        this.drawMap.set(teamName, 1);
      }
    } else if (homeScore < awayScore) {
      if (this.loseMap.has(teamName)) {
        const losses = <number> this.loseMap.get(teamName);
        this.loseMap.set(teamName, losses + 1);
      } else {
        this.loseMap.set(teamName, 1);
      }
    }
  }

  public getGameResults() {
    this.games = this.scheduleService.getGamesBySelectedSessionValue(this.appService.selectedSessionValue);
    this.gamesList = [];

    this.teamList.forEach(team => {
      this.games.forEach(game => {
        if (game.isScoreFinal && (game.homeTeam === team.teamName)) {
          this.gamesList.push(game);
        }
      });
    });

    if (this.selectedDivisionValue==='1') {
      this.teamList = this.standingsService.getTeamsListD1();
    } else {
      this.teamList = this.standingsService.getTeamsListD2();
    }

    this.teamList.forEach(team => {
      this.gamesList.forEach(game => {
        if (game.session == this.appService.selectedSessionValue && game.isScoreFinal && game.homeTeam.toLowerCase() == team.teamName.toLowerCase()) {
          this.getHomeResult(game.homeScore, game.awayScore, team.teamName);
        } else if (game.isScoreFinal && game.awayTeam.toLowerCase() == team.teamName.toLowerCase()) {
          this.getAwayResult(game.homeScore, game.awayScore, team.teamName);
        }
      });
    });

    this.dataSource = new MatTableDataSource(this.gamesList);
    this.dataSource.sort = this.sort;
  }

  public getPoints() {
    this.pointsMap.clear();

    if (this.selectedDivisionValue==='1') {
      this.teamList = this.standingsService.getTeamsListD1();
    } else {
      this.teamList = this.standingsService.getTeamsListD2();
    }

    this.teamList.forEach(team => {
      if (this.winMap.has(team.teamName)) {
        const wins = <number> this.winMap.get(team.teamName);
        const points = <number> this.pointsMap.get(team.teamName) ? <number> this.pointsMap.get(team.teamName) : 0;

        this.pointsMap.set(team.teamName, points + (wins * 3));
      }

      if (this.drawMap.has(team.teamName)) {
        const draws = <number> this.drawMap.get(team.teamName);
        const points = <number> this.pointsMap.get(team.teamName) ? <number> this.pointsMap.get(team.teamName) : 0;

        this.pointsMap.set(team.teamName, points + (draws));
      }
    });
  }

  public getRoadkillPosition() {
    const mapSort1 = new Map([...this.pointsMap.entries()].sort((a, b) => b[1] - a[1]));
    const keys = Array.from( mapSort1.keys() );
    let count = 0;


    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "Roadkill") {
        count = i + 1;
        break;
      }
    }

    switch (count) {
      case 1:
        this.position = "1st Place";
        break;

      case 2:
        this.position = "2nd Place";
        break;

      case 3:
        this.position = "3rd Place";
        break;

      case 4:
        this.position = "4th Place";
        break;

      case 5:
        this.position = "5th Place";
        break;

      case 6:
        this.position = "6th Place";
        break;

      case 7:
        this.position = "7th Place";
        break;

      case 8:
        this.position = "8th Place";
        break;

      case 9:
        this.position = "9th Place";
        break;
    }
  }

  public setSelectedDivision(selectedDivisionValue: any) {
    this.selectedDivisionValue = selectedDivisionValue.target.value;
    this.initData();
  }

  /*public setSelectedDivision(selectedDivisionValue: string) {
    this.selectedDivisionValue = selectedDivisionValue;
    this.initData();
  }*/

  public setSelectedSession(selectedSessionValue: string) {
    this.appService.selectedSessionValue = selectedSessionValue;
    this.appService.setSelectedSession();

    this.initData();
  }
}
