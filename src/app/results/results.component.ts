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

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements AfterViewInit, OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private ROADKILL = "ROADKILL";
  public results: Result[] = [];
  public wins = 0;
  public draws = 0;
  public losses = 0;
  public points = 0;

  public filterEntity: Game = new Game();

  public filterType = MatTableFilter.ANYWHERE;
  public dataSource = new MatTableDataSource(this.scheduleService.gameData);

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

  constructor(public resultsService : ResultsService,
              public scheduleService : ScheduleService) {
  }

 public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
 }

  public ngOnInit() {
    this.filterEntity = new Game();
    this.filterType = MatTableFilter.ANYWHERE;
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
    this.dataSource.sort = this.sort;
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
