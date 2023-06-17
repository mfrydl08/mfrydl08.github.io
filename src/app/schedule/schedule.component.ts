import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ScheduleService} from "./schedule.service";
import {Game} from "../models/game";
import {Subject} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {AppService} from "../app.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements AfterViewInit, OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private ROADKILL = "ROADKILL";
  public games: Game[] = [];
  public dataSource = new MatTableDataSource();
  // public dataSource = new MatTableDataSource(this.scheduleService.gameData);

  initColumns = [
    { name: 'week', display: 'Week' },
    { name: 'gameDate', display: 'Game Date' },
    { name: 'gameTime', display: 'Game Time' },
    { name: 'homeTeam', display: 'Home Team' },
    { name: 'awayTeam', display: 'Away Team' },
    { name: 'field', display: 'Field' },
    { name: 'status', display: '' },
  ];

  public displayedColumns = this.initColumns.map((col) => col.name);
  public pageSizes = [20, 50, 75, 100];
  public defaultPageSize = 50;




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private scheduleService : ScheduleService,
              private httpClient: HttpClient,
              public appService: AppService) {
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnInit() {
    this.games = [];

    this.httpClient.get("assets/gameData.json").subscribe(data => {
      this.games = <Game[]>data;

      this.dataSource.data = this.games
      console.log("this.games: " + JSON.stringify(this.games));
      this.dataSource.sort = this.sort;
    });
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


// import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
// import {ScheduleService} from "./schedule.service";
// import {Game} from "../models/game";
// import {Subject} from "rxjs";
// import {MatPaginator} from "@angular/material/paginator";
// import {MatTableDataSource} from "@angular/material/table";
// import {MatSort} from "@angular/material/sort";
//
// @Component({
//   selector: 'app-schedule',
//   templateUrl: './schedule.component.html',
//   styleUrls: ['./schedule.component.css']
// })
// export class ScheduleComponent implements AfterViewInit, OnInit, OnDestroy {
//   private destroy$: Subject<boolean> = new Subject<boolean>();
//   private ROADKILL = "ROADKILL";
//   public games: Game[] = [];
//   public dataSource = new MatTableDataSource();
//   // public dataSource = new MatTableDataSource(this.scheduleService.gameData);
//
//   initColumns = [
//     { name: 'week', display: 'Week' },
//     { name: 'gameDate', display: 'Game Date' },
//     { name: 'gameTime', display: 'Game Time' },
//     { name: 'homeTeam', display: 'Home Team' },
//     { name: 'awayTeam', display: 'Away Team' },
//     { name: 'field', display: 'Field' },
//   ];
//
//   public displayedColumns = this.initColumns.map((col) => col.name);
//   public pageSizes = [10, 20, 50, 100];
//   public defaultPageSize = 50;
//
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort, { static: true }) sort!: MatSort;
//
//   constructor(private scheduleService : ScheduleService) {
//   }
//
//   public ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }
//
//   public ngOnInit() {
//     this.games = [];
//     this.games = this.scheduleService.getGameData();
//     this.dataSource.data = this.scheduleService.getGameData();
//     console.log(JSON.stringify(this.games));
//     this.dataSource.sort = this.sort;
//   }
//
//   public ngOnDestroy() {
//     this.destroy$.next(true);
//     this.destroy$.complete();
//   }
//
//   public applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
// }
