import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Standing} from "../models/standing";
import {Game} from "../models/game";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ScheduleService} from "../schedule/schedule.service";
import {MatSort, MatSortable} from "@angular/material/sort";
import {Teams} from "../models/teams";
import {StandingsService} from "./standings.service";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
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
  public formMap: Map<string, string[]> = new Map<string, string[]>();

  public teamList: Teams[] = [];
  public standings: Standing[] = [];
  public games: Game[] = this.scheduleService.gameData;
  public pageSizes = [10, 20, 50, 100];
  public form: string[] = [];
  public session = "Spring '23 ";

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
    {name: 'form', display: 'Form'},
  ];

  public dataSource = new MatTableDataSource(this.standings);
  public displayedColumns = this.initColumns.map((col) => col.name);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(public scheduleService: ScheduleService,
              public standingsService: StandingsService) {
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.teamList = this.standingsService.teamList;
    this.getGameResults();
    this.getPoints();
    this.buildStandings();
    this.sortDataSource('points', 'desc');
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
      let form: string[] = [];
      this.form = [];

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
      if (this.formMap.has(team.teamName)) {
        form = <string[]>this.formMap.get(team.teamName);
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
      teamInfo.form = form.reverse();
      this.standings.push(teamInfo);
    });
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
    let form: string[] = [];
    if (awayScore > homeScore) {
      if (this.winMap.has(teamName)) {
        const wins = <number> this.winMap.get(teamName);
        this.winMap.set(teamName, wins + 1);
      } else {
        this.winMap.set(teamName, 1);
      }
      if (this.formMap.has(teamName)) {
        form = <string[]>this.formMap.get(teamName);
        form.push("+");
        this.formMap.set(teamName, form);
      } else {
        form.push("+");
        this.formMap.set(teamName, form);
      }
    } else if (awayScore == homeScore) {
      if (this.drawMap.has(teamName)) {
        const draws = <number> this.drawMap.get(teamName);
        this.drawMap.set(teamName, draws + 1);
      } else {
        this.drawMap.set(teamName, 1);
      }
      if (this.formMap.has(teamName)) {
        form = <string[]>this.formMap.get(teamName);
        form.push("-");
        this.formMap.set(teamName, form);
      } else {
        form.push("-");
        this.formMap.set(teamName, form);
      }
    } else if (awayScore < homeScore) {
      if (this.loseMap.has(teamName)) {
        const losses = <number> this.loseMap.get(teamName);
        this.loseMap.set(teamName, losses + 1);
      } else {
        this.loseMap.set(teamName, 1);
      }
      if (this.formMap.has(teamName)) {
        form = <string[]>this.formMap.get(teamName);
        form.push("x");
        this.formMap.set(teamName, form);
      } else {
        form.push("x");
        this.formMap.set(teamName, form);
      }
    }
  }

  public getHomeResult(homeScore: number, awayScore: number, teamName: string) {
    let form: string[] = [];
    if (homeScore > awayScore) {
      if (this.winMap.has(teamName)) {
        const wins = <number> this.winMap.get(teamName);
        this.winMap.set(teamName, wins + 1);
      } else {
        this.winMap.set(teamName, 1);
      }
      if (this.formMap.has(teamName)) {
        form = <string[]>this.formMap.get(teamName);
        form.push("+");
        this.formMap.set(teamName, form);
      } else {
        form.push("+");
        this.formMap.set(teamName, form);
      }
    } else if (homeScore == awayScore) {
      if (this.drawMap.has(teamName)) {
        const draws = <number> this.drawMap.get(teamName);
        this.drawMap.set(teamName, draws + 1);
      } else {
        this.drawMap.set(teamName, 1);
      }
      if (this.formMap.has(teamName)) {
        form = <string[]>this.formMap.get(teamName);
        form.push("-");
        this.formMap.set(teamName, form);
      } else {
        form.push("-");
        this.formMap.set(teamName, form);
      }
    } else if (homeScore < awayScore) {
      if (this.loseMap.has(teamName)) {
        const losses = <number> this.loseMap.get(teamName);
        this.loseMap.set(teamName, losses + 1);
      } else {
        this.loseMap.set(teamName, 1);
      }
      if (this.formMap.has(teamName)) {
        form = <string[]>this.formMap.get(teamName);
        form.push("x");
        this.formMap.set(teamName, form);
      } else {
        form.push("x");
        this.formMap.set(teamName, form);
      }
    }
  }

  public sortDataSource(id: string, start: string) {
    this.dataSource.sort!.sort(<MatSortable>({ id: id, start: start }));
    this.dataSource.data.sort((a: any, b: any) => {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}





// import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
// import {Standing} from "../models/standing";
// import {Game} from "../models/game";
// import {MatTableDataSource} from "@angular/material/table";
// import {MatPaginator} from "@angular/material/paginator";
// import {ScheduleService} from "../schedule/schedule.service";
// import {MatSort, MatSortable} from "@angular/material/sort";
// import {Teams} from "../models/teams";
// import {StandingsService} from "./standings.service";
//
// export interface Sort {
//   id: string;
//   direction: 'asc' | 'desc';
// }
//
// @Component({
//   selector: 'app-standings',
//   templateUrl: './standings.component.html',
//   styleUrls: ['./standings.component.css'],
// })
//
// export class StandingsComponent implements AfterViewInit, OnInit {
//   private ROADKILL = "ROADKILL";
//
//   public week = 0;
//
//   public winMap: Map<string, number> = new Map<string, number>();
//   public drawMap: Map<string, number> = new Map<string, number>();
//   public loseMap: Map<string, number> = new Map<string, number>();
//   public pointsMap: Map<string, number> = new Map<string, number>();
//   public goalsScoredMap: Map<string, number> = new Map<string, number>();
//   public goalsConcededMap: Map<string, number> = new Map<string, number>();
//   public formMap: Map<string, string[]> = new Map<string, string[]>();
//
//   public teamList: Teams[] = [];
//   public standings: Standing[] = [];
//   public games: Game[] = this.scheduleService.gameData;
//   public pageSizes = [10, 20, 50, 100];
//   public form: string[] = [];
//
//   initColumns = [
//     {name: 'teamName', display: 'Club'},
//     {name: 'matchesPlayed', display: 'MP'},
//     {name: 'wins', display: 'W'},
//     {name: 'draws', display: 'D'},
//     {name: 'losses', display: 'L'},
//     {name: 'goalsScored', display: 'GF'},
//     {name: 'goalsConceded', display: 'GA'},
//     {name: 'goalDiff', display: 'GD'},
//     {name: 'points', display: 'Pts'},
//     {name: 'last5', display: 'Last 5'},
//   ];
//
//   public dataSource = new MatTableDataSource(this.standings);
//   public displayedColumns = this.initColumns.map((col) => col.name);
//
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort, {static: true}) sort!: MatSort;
//
//   constructor(public scheduleService: ScheduleService,
//               public standingsService: StandingsService) {
//   }
//
//   public ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }
//
//
//   public ngOnInit() {
//     this.dataSource.sort = this.sort;
//     this.teamList = this.standingsService.teamList;
//     this.getGameResults();
//     this.getPoints();
//     this.buildStandings();
//
//     this.sortDataSource('goalDiff', 'desc');
//     this.sortDataSource('points', 'desc');
//
//   }
//
//   public applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
//
//   public buildStandings() {
//     this.teamList.forEach(team => {
//       const teamInfo : Standing = new Standing();
//       let wins = 0;
//       let draws = 0;
//       let losses = 0;
//       let points = 0;
//       let goalsConceded = 0;
//       let goalsScored = 0;
//       let form: string[] = [];
//       this.form = [];
//
//       if (this.winMap.has(team.teamName)) {
//         wins = <number> this.winMap.get(team.teamName);
//       }
//       if (this.drawMap.has(team.teamName)) {
//         draws = <number> this.drawMap.get(team.teamName);
//       }
//       if (this.loseMap.has(team.teamName)) {
//         losses = <number> this.loseMap.get(team.teamName);
//       }
//       if (this.pointsMap.has(team.teamName)) {
//         points = <number> this.pointsMap.get(team.teamName);
//       }
//       if (this.goalsScoredMap.has(team.teamName)) {
//         goalsScored = <number> this.goalsScoredMap.get(team.teamName);
//       }
//       if (this.goalsConcededMap.has(team.teamName)) {
//         goalsConceded = <number> this.goalsConcededMap.get(team.teamName);
//       }
//       if (this.formMap.has(team.teamName)) {
//         form = <string[]>this.formMap.get(team.teamName);
//       }
//
//       teamInfo.id = team.id;
//       teamInfo.teamName = team.teamName;
//       teamInfo.wins = wins;
//       teamInfo.draws = draws;
//       teamInfo.losses = losses;
//       teamInfo.points = points;
//       teamInfo.goalsConceded = goalsConceded;
//       teamInfo.goalsScored = goalsScored;
//       teamInfo.goalDiff = goalsScored - goalsConceded;
//       teamInfo.matchesPlayed = wins + draws + losses;
//       teamInfo.form = form.reverse();
//       this.standings.push(teamInfo);
//     });
//   }
//
//   public getGameResults() {
//     this.teamList.forEach(team => {
//       this.games.forEach(game => {
//         if (game.isScoreFinal && game.homeTeam.toLowerCase() == team.teamName.toLowerCase()) {
//           this.getHomeResult(game.homeScore, game.awayScore, team.teamName);
//           this.getHomeGoalsScored(game.homeScore, team.teamName);
//           this.getHomeGoalsConceded(game.awayScore, team.teamName);
//         } else if (game.isScoreFinal && game.awayTeam.toLowerCase() == team.teamName.toLowerCase()) {
//           this.getAwayResult(game.homeScore, game.awayScore, team.teamName);
//           this.getAwayGoalsScored(game.awayScore, team.teamName);
//           this.getAwayGoalsConceded(game.homeScore, team.teamName);
//         }
//       });
//     });
//   }
//
//   public getPoints() {
//     this.teamList.forEach(team => {
//       if (this.winMap.has(team.teamName)) {
//         const wins = <number> this.winMap.get(team.teamName);
//         const points = <number> this.pointsMap.get(team.teamName) ? <number> this.pointsMap.get(team.teamName) : 0;
//
//         this.pointsMap.set(team.teamName, points + (wins * 3));
//       }
//
//
//       if (this.drawMap.has(team.teamName)) {
//         const draws = <number> this.drawMap.get(team.teamName);
//         const points = <number> this.pointsMap.get(team.teamName) ? <number> this.pointsMap.get(team.teamName) : 0;
//
//         this.pointsMap.set(team.teamName, points + (draws));
//       }
//     });
//   }
//
//   public getAwayGoalsConceded(homeScore: number, teamName: string) {
//     if (this.goalsConcededMap.has(teamName)) {
//       const goals = <number> this.goalsConcededMap.get(teamName);
//       this.goalsConcededMap.set(teamName, goals + homeScore);
//     } else {
//       this.goalsConcededMap.set(teamName, homeScore);
//     }
//   }
//
//   public getAwayGoalsScored(awayScore: number, teamName: string) {
//     if (this.goalsScoredMap.has(teamName)) {
//       const goals = <number> this.goalsScoredMap.get(teamName);
//       this.goalsScoredMap.set(teamName, goals + awayScore);
//     } else {
//       this.goalsScoredMap.set(teamName, awayScore);
//     }
//   }
//
//   public getHomeGoalsConceded(awayScore: number, teamName: string) {
//     if (this.goalsConcededMap.has(teamName)) {
//       const goals = <number> this.goalsConcededMap.get(teamName);
//       this.goalsConcededMap.set(teamName, goals + awayScore);
//     } else {
//       this.goalsConcededMap.set(teamName, awayScore);
//     }
//   }
//
//   public getHomeGoalsScored(homeScore: number, teamName: string) {
//     if (this.goalsScoredMap.has(teamName)) {
//       const goals = <number> this.goalsScoredMap.get(teamName);
//       this.goalsScoredMap.set(teamName, goals + homeScore);
//     } else {
//       this.goalsScoredMap.set(teamName, homeScore);
//     }
//   }
//
//   public getAwayResult(homeScore: number, awayScore: number, teamName: string) {
//     let form: string[] = [];
//     if (awayScore > homeScore) {
//       if (this.winMap.has(teamName)) {
//         const wins = <number> this.winMap.get(teamName);
//         this.winMap.set(teamName, wins + 1);
//       } else {
//         this.winMap.set(teamName, 1);
//       }
//       if (this.formMap.has(teamName)) {
//         form = <string[]>this.formMap.get(teamName);
//         form.push("+");
//         this.formMap.set(teamName, form);
//       } else {
//         form.push("+");
//         this.formMap.set(teamName, form);
//       }
//     } else if (awayScore == homeScore) {
//       if (this.drawMap.has(teamName)) {
//         const draws = <number> this.drawMap.get(teamName);
//         this.drawMap.set(teamName, draws + 1);
//       } else {
//         this.drawMap.set(teamName, 1);
//       }
//       if (this.formMap.has(teamName)) {
//         form = <string[]>this.formMap.get(teamName);
//         form.push("-");
//         this.formMap.set(teamName, form);
//       } else {
//         form.push("-");
//         this.formMap.set(teamName, form);
//       }
//     } else if (awayScore < homeScore) {
//       if (this.loseMap.has(teamName)) {
//         const losses = <number> this.loseMap.get(teamName);
//         this.loseMap.set(teamName, losses + 1);
//       } else {
//         this.loseMap.set(teamName, 1);
//       }
//       if (this.formMap.has(teamName)) {
//         form = <string[]>this.formMap.get(teamName);
//         form.push("x");
//         this.formMap.set(teamName, form);
//       } else {
//         form.push("x");
//         this.formMap.set(teamName, form);
//       }
//     }
//   }
//
//   public getHomeResult(homeScore: number, awayScore: number, teamName: string) {
//     let form: string[] = [];
//     if (homeScore > awayScore) {
//       if (this.winMap.has(teamName)) {
//         const wins = <number> this.winMap.get(teamName);
//         this.winMap.set(teamName, wins + 1);
//       } else {
//         this.winMap.set(teamName, 1);
//       }
//       if (this.formMap.has(teamName)) {
//         form = <string[]>this.formMap.get(teamName);
//         form.push("+");
//         this.formMap.set(teamName, form);
//       } else {
//         form.push("+");
//         this.formMap.set(teamName, form);
//       }
//     } else if (homeScore == awayScore) {
//       if (this.drawMap.has(teamName)) {
//         const draws = <number> this.drawMap.get(teamName);
//         this.drawMap.set(teamName, draws + 1);
//       } else {
//         this.drawMap.set(teamName, 1);
//       }
//       if (this.formMap.has(teamName)) {
//         form = <string[]>this.formMap.get(teamName);
//         form.push("-");
//         this.formMap.set(teamName, form);
//       } else {
//         form.push("-");
//         this.formMap.set(teamName, form);
//       }
//     } else if (homeScore < awayScore) {
//       if (this.loseMap.has(teamName)) {
//         const losses = <number> this.loseMap.get(teamName);
//         this.loseMap.set(teamName, losses + 1);
//       } else {
//         this.loseMap.set(teamName, 1);
//       }
//       if (this.formMap.has(teamName)) {
//         form = <string[]>this.formMap.get(teamName);
//         form.push("x");
//         this.formMap.set(teamName, form);
//       } else {
//         form.push("x");
//         this.formMap.set(teamName, form);
//       }
//     }
//   }
//
//   public sortDataSource(id: string, start: string) {
//     this.dataSource.sort!.sort(<MatSortable>({ id: id, start: start }));
//     this.dataSource.data.sort((a: any, b: any) => {
//       if (a.id < b.id) {
//         return -1;
//       } else if (a.id > b.id) {
//         return 1;
//       } else {
//         return 0;
//       }
//     });
//   }
// }
