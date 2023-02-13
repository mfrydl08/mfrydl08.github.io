import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {RosterService} from "./roster.service";
import {Player} from "../models/player";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
  private rosterService = inject(RosterService);
  public players: Player[] = [];
  public dataSource = new MatTableDataSource(this.rosterService.playerData);

  initColumns: any[] = [
    { name: 'fullName', display: 'Name' },
    { name: 'position', display: 'Position' },
    { name: 'number', display: 'Jersey Number' },
  ];

  public displayedColumns: any[] = this.initColumns.map((col) => col.name);

  @ViewChild(MatSort, { static: true }) sort!: MatSort

  constructor() {}

  public ngOnInit() {
    this.players = this.rosterService.getPlayers();
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
