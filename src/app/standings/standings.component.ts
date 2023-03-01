import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Standing} from "../models/standing";
import {Game} from "../models/game";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ScheduleService} from "../schedule/schedule.service";
import {MatSort} from "@angular/material/sort";
import {Teams} from "../models/teams";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {StandingsService} from "./standings.service";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class StandingsComponent implements AfterViewInit, OnInit {
  private ROADKILL = "ROADKILL";

  public week = 0;

  public winMap: Map<string, number> = new Map<string, number>();
  public drawMap: Map<string, number> = new Map<string, number>();
  public loseMap: Map<string, number> = new Map<string, number>();
  public pointsMap: Map<string, number> = new Map<string, number>();
  public goalsScoredMap: Map<string, number> = new Map<string, number>();
  public goalsConcededMap: Map<string, number> = new Map<string, number>();
  public lastFiveMap: Map<string, string[]> = new Map<string, string[]>();

  public teamList: Teams[] = [];
  public standings: Standing[] = [];
  public games: Game[] = this.scheduleService.gameData;
  public pageSizes = [10, 20, 50, 100];
  public lastFive: string[] = [];

  initColumns = [
    {name: 'teamName', display: 'Club'},
    {name: 'matchesPlayed', display: 'MP'},
    {name: 'wins', display: 'W'},
    {name: 'draws', display: 'D'},
    {name: 'losses', display: 'L'},
    {name: 'goalsScored', display: 'GF'},
    {name: 'goalsConceded', display: 'GA'},
    {name: 'goalDiff', display: 'GD'},
    {name: 'points', display: 'Pts'},
    {name: 'last5', display: 'Last 5'},
  ];

  public dataSource = new MatTableDataSource(this.standings);
  public displayedColumns = this.initColumns.map((col) => col.name);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  test() {
    console.log('test');
  }

  constructor(public scheduleService: ScheduleService,
              public standingsService: StandingsService) {
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.teamList = this.standingsService.teamList;
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
      const teamInfo : Standing = new Standing();
      let wins = 0;
      let draws = 0;
      let losses = 0;
      let points = 0;
      let goalsConceded = 0;
      let goalsScored = 0;
      let lastFive: string[] = [];
      this.lastFive = [];

      if (this.winMap.has(team.teamName)) {
        wins = <number> this.winMap.get(team.teamName);
      }
      if (this.drawMap.has(team.teamName)) {
        draws = <number> this.drawMap.get(team.teamName);
      }
      if (this.loseMap.has(team.teamName)) {
        losses = <number> this.loseMap.get(team.teamName);
      }
      if (this.pointsMap.has(team.teamName)) {
        points = <number> this.pointsMap.get(team.teamName);
      }
      if (this.goalsScoredMap.has(team.teamName)) {
        goalsScored = <number> this.goalsScoredMap.get(team.teamName);
      }
      if (this.goalsConcededMap.has(team.teamName)) {
        goalsConceded = <number> this.goalsConcededMap.get(team.teamName);
      }
      if (this.lastFiveMap.has(team.teamName)) {
        lastFive = <string[]>this.lastFiveMap.get(team.teamName);
      }

      teamInfo.id = team.id;
      teamInfo.teamName = team.teamName;
      teamInfo.wins = wins;
      teamInfo.draws = draws;
      teamInfo.losses = losses;
      teamInfo.points = points;
      teamInfo.goalsConceded = goalsConceded;
      teamInfo.goalsScored = goalsScored;
      teamInfo.goalDiff = goalsScored - goalsConceded;
      teamInfo.matchesPlayed = wins + draws + losses;
      teamInfo.lastFive = lastFive;
      this.standings.push(teamInfo);
      console.log("teamInfo: " + JSON.stringify(teamInfo));
    });
    console.log("lastFiveMap: " + JSON.stringify(this.lastFiveMap.get("Roadkill")));
  }

  public getGameResults() {
    this.teamList.forEach(team => {
      this.games.forEach(game => {
        if (game.isScoreFinal && game.homeTeam.toLowerCase() == team.teamName.toLowerCase()) {
          this.getHomeResult(game.homeScore, game.awayScore, team.teamName);
          this.getHomeGoalsScored(game.homeScore, team.teamName);
          this.getHomeGoalsConceded(game.awayScore, team.teamName);
        } else if (game.isScoreFinal && game.awayTeam.toLowerCase() == team.teamName.toLowerCase()) {
          this.getAwayResult(game.homeScore, game.awayScore, team.teamName);
          this.getAwayGoalsScored(game.awayScore, team.teamName);
          this.getAwayGoalsConceded(game.homeScore, team.teamName);
        }
      });
    });
  }

  public getPoints() {
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

  public getAwayGoalsConceded(homeScore: number, teamName: string) {
    if (this.goalsConcededMap.has(teamName)) {
      const goals = <number> this.goalsConcededMap.get(teamName);
      this.goalsConcededMap.set(teamName, goals + homeScore);
    } else {
      this.goalsConcededMap.set(teamName, homeScore);
    }
  }

  public getAwayGoalsScored(awayScore: number, teamName: string) {
    if (this.goalsScoredMap.has(teamName)) {
      const goals = <number> this.goalsScoredMap.get(teamName);
      this.goalsScoredMap.set(teamName, goals + awayScore);
    } else {
      this.goalsScoredMap.set(teamName, awayScore);
    }
  }

  public getHomeGoalsConceded(awayScore: number, teamName: string) {
    if (this.goalsConcededMap.has(teamName)) {
      const goals = <number> this.goalsConcededMap.get(teamName);
      this.goalsConcededMap.set(teamName, goals + awayScore);
    } else {
      this.goalsConcededMap.set(teamName, awayScore);
    }
  }

  public getHomeGoalsScored(homeScore: number, teamName: string) {
    if (this.goalsScoredMap.has(teamName)) {
      const goals = <number> this.goalsScoredMap.get(teamName);
      this.goalsScoredMap.set(teamName, goals + homeScore);
    } else {
      this.goalsScoredMap.set(teamName, homeScore);
    }
  }

  public getAwayResult(homeScore: number, awayScore: number, teamName: string) {
    let lastFive: string[] = [];
    if (awayScore > homeScore) {
      if (this.winMap.has(teamName)) {
        const wins = <number> this.winMap.get(teamName);
        this.winMap.set(teamName, wins + 1);
      } else {
        this.winMap.set(teamName, 1);
      }
      if (this.lastFiveMap.has(teamName)) {
        lastFive = <string[]>this.lastFiveMap.get(teamName);
        lastFive.push("+");
        this.lastFiveMap.set(teamName, lastFive);
      } else {
        lastFive.push("+");
        this.lastFiveMap.set(teamName, lastFive);
      }
    } else if (awayScore == homeScore) {
      if (this.drawMap.has(teamName)) {
        const draws = <number> this.drawMap.get(teamName);
        this.drawMap.set(teamName, draws + 1);
      } else {
        this.drawMap.set(teamName, 1);
      }
      if (this.lastFiveMap.has(teamName)) {
        lastFive = <string[]>this.lastFiveMap.get(teamName);
        lastFive.push("-");
        this.lastFiveMap.set(teamName, lastFive);
      } else {
        lastFive.push("-");
        this.lastFiveMap.set(teamName, lastFive);
      }
    } else if (awayScore < homeScore) {
      if (this.loseMap.has(teamName)) {
        const losses = <number> this.loseMap.get(teamName);
        this.loseMap.set(teamName, losses + 1);
      } else {
        this.loseMap.set(teamName, 1);
      }
      if (this.lastFiveMap.has(teamName)) {
        lastFive = <string[]>this.lastFiveMap.get(teamName);
        lastFive.push("x");
        this.lastFiveMap.set(teamName, lastFive);
      } else {
        lastFive.push("x");
        this.lastFiveMap.set(teamName, lastFive);
      }
    }
  }

  public getHomeResult(homeScore: number, awayScore: number, teamName: string) {
    let lastFive: string[] = [];
    if (homeScore > awayScore) {
      if (this.winMap.has(teamName)) {
        const wins = <number> this.winMap.get(teamName);
        this.winMap.set(teamName, wins + 1);
      } else {
        this.winMap.set(teamName, 1);
      }
      if (this.lastFiveMap.has(teamName)) {
        lastFive = <string[]>this.lastFiveMap.get(teamName);
        lastFive.push("+");
        this.lastFiveMap.set(teamName, lastFive);
      } else {
        lastFive.push("+");
        this.lastFiveMap.set(teamName, lastFive);
      }
    } else if (homeScore == awayScore) {
      if (this.drawMap.has(teamName)) {
        const draws = <number> this.drawMap.get(teamName);
        this.drawMap.set(teamName, draws + 1);
      } else {
        this.drawMap.set(teamName, 1);
      }
      if (this.lastFiveMap.has(teamName)) {
        lastFive = <string[]>this.lastFiveMap.get(teamName);
        lastFive.push("-");
        this.lastFiveMap.set(teamName, lastFive);
      } else {
        lastFive.push("-");
        this.lastFiveMap.set(teamName, lastFive);
      }
    } else if (homeScore < awayScore) {
      if (this.loseMap.has(teamName)) {
        const losses = <number> this.loseMap.get(teamName);
        this.loseMap.set(teamName, losses + 1);
      } else {
        this.loseMap.set(teamName, 1);
      }
      if (this.lastFiveMap.has(teamName)) {
        lastFive = <string[]>this.lastFiveMap.get(teamName);
        lastFive.push("x");
        this.lastFiveMap.set(teamName, lastFive);
      } else {
        lastFive.push("x");
        this.lastFiveMap.set(teamName, lastFive);
      }
    }
  }

  // public getAwayResult(homeScore: number, awayScore: number, teamName: string) {
  //   let lastFive: string[] = [];
  //   if (awayScore > homeScore) {
  //     if (this.winMap.has(teamName)) {
  //       const wins = <number> this.winMap.get(teamName);
  //       this.winMap.set(teamName, wins + 1);
  //     } else {
  //       this.winMap.set(teamName, 1);
  //     }
  //     if (this.lastFiveMap.has(teamName)) {
  //       lastFive = <string[]>this.lastFiveMap.get(teamName);
  //       lastFive.push("W");
  //       this.lastFiveMap.set(teamName, lastFive);
  //     } else {
  //       lastFive.push("W");
  //       this.lastFiveMap.set(teamName, lastFive);
  //     }
  //   } else if (awayScore == homeScore) {
  //     if (this.drawMap.has(teamName)) {
  //       const draws = <number> this.drawMap.get(teamName);
  //       this.drawMap.set(teamName, draws + 1);
  //     } else {
  //       this.drawMap.set(teamName, 1);
  //     }
  //     if (this.lastFiveMap.has(teamName)) {
  //       lastFive = <string[]>this.lastFiveMap.get(teamName);
  //       lastFive.push("D");
  //       this.lastFiveMap.set(teamName, lastFive);
  //     } else {
  //       lastFive.push("D");
  //       this.lastFiveMap.set(teamName, lastFive);
  //     }
  //   } else if (awayScore < homeScore) {
  //     if (this.loseMap.has(teamName)) {
  //       const losses = <number> this.loseMap.get(teamName);
  //       this.loseMap.set(teamName, losses + 1);
  //     } else {
  //       this.loseMap.set(teamName, 1);
  //     }
  //     if (this.lastFiveMap.has(teamName)) {
  //       lastFive = <string[]>this.lastFiveMap.get(teamName);
  //       lastFive.push("L");
  //       this.lastFiveMap.set(teamName, lastFive);
  //     } else {
  //       lastFive.push("L");
  //       this.lastFiveMap.set(teamName, lastFive);
  //     }
  //   }
  // }

  // public getHomeResult(homeScore: number, awayScore: number, teamName: string) {
  //   let lastFive: string[] = [];
  //   if (homeScore > awayScore) {
  //     if (this.winMap.has(teamName)) {
  //       const wins = <number> this.winMap.get(teamName);
  //       this.winMap.set(teamName, wins + 1);
  //     } else {
  //       this.winMap.set(teamName, 1);
  //     }
  //     if (this.lastFiveMap.has(teamName)) {
  //       lastFive = <string[]>this.lastFiveMap.get(teamName);
  //       lastFive.push("W");
  //       this.lastFiveMap.set(teamName, lastFive);
  //     } else {
  //       lastFive.push("W");
  //       this.lastFiveMap.set(teamName, lastFive);
  //     }
  //   } else if (homeScore == awayScore) {
  //     if (this.drawMap.has(teamName)) {
  //       const draws = <number> this.drawMap.get(teamName);
  //       this.drawMap.set(teamName, draws + 1);
  //     } else {
  //       this.drawMap.set(teamName, 1);
  //     }
  //     if (this.lastFiveMap.has(teamName)) {
  //       lastFive = <string[]>this.lastFiveMap.get(teamName);
  //       lastFive.push("D");
  //       this.lastFiveMap.set(teamName, lastFive);
  //     } else {
  //       lastFive.push("D");
  //       this.lastFiveMap.set(teamName, lastFive);
  //     }
  //   } else if (homeScore < awayScore) {
  //     if (this.loseMap.has(teamName)) {
  //       const losses = <number> this.loseMap.get(teamName);
  //       this.loseMap.set(teamName, losses + 1);
  //     } else {
  //       this.loseMap.set(teamName, 1);
  //     }
  //     if (this.lastFiveMap.has(teamName)) {
  //       lastFive = <string[]>this.lastFiveMap.get(teamName);
  //       lastFive.push("L");
  //       this.lastFiveMap.set(teamName, lastFive);
  //     } else {
  //       lastFive.push("L");
  //       this.lastFiveMap.set(teamName, lastFive);
  //     }
  //   }
  // }
}
