import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ScheduleService} from "./schedule.service";
import {Game} from "../models/game";
import {Subject} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements AfterViewInit, OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private ROADKILL = "ROADKILL";
  public games: Game[] = [];
  public dataSource = new MatTableDataSource(this.scheduleService.gameData);

  initColumns = [
    { name: 'week', display: 'Week' },
    { name: 'gameDate', display: 'Game Date' },
    { name: 'gameTime', display: 'Game Time' },
    { name: 'homeTeam', display: 'Home Team' },
    { name: 'awayTeam', display: 'Away Team' },
    { name: 'field', display: 'Field' },
  ];

  public displayedColumns = this.initColumns.map((col) => col.name);
  public pageSizes = [10, 20, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private scheduleService : ScheduleService) {
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnInit() {
    this.games = [];
    this.games = this.scheduleService.getGames();
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
