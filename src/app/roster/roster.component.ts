import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
  @Input() teamName!: string;

  public players: Array<Player> = [];
  public dataSource = new MatTableDataSource(this.rosterService.playerData);

  initColumns = [
    { name: 'fullName', display: 'Name' },
    { name: 'position', display: 'Position' },
    { name: 'number', display: 'Jersey Number' },
  ];

  public displayedColumns = this.initColumns.map((col) => col.name);

  @ViewChild(MatSort, { static: true }) sort!: MatSort

  constructor(private rosterService: RosterService) {}

  public ngOnInit() {
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

// //All Teams
// import {Component, Input, OnInit, ViewChild} from '@angular/core';
// import {RosterService} from "./roster.service";
// import {Player} from "../models/player";
// import {MatTableDataSource} from "@angular/material/table";
// import {MatSort} from "@angular/material/sort";
//
// @Component({
//   selector: 'app-roster',
//   templateUrl: './roster.component.html',
//   styleUrls: ['./roster.component.css']
// })
// export class RosterComponent implements OnInit {
//   @Input() teamName!: string;
//
//   public players: Array<Player> = [];
//   public dataSource = new MatTableDataSource(this.rosterService.playerData);
//
//   initColumns = [
//     { name: 'fullName', display: 'Name' },
//     { name: 'position', display: 'Position' },
//     { name: 'number', display: 'Jersey Number' },
//   ];
//
//   public displayedColumns = this.initColumns.map((col) => col.name);
//
//   @ViewChild(MatSort, { static: true }) sort!: MatSort
//
//   constructor(private rosterService: RosterService) {}
//
//   public ngOnInit() {
//     this.dataSource.sort = this.sort;
//     this.dataSource.filter = this.teamName.trim().toLowerCase();
//   }
//
//   public applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//
//     if (filterValue.trim() === '' || filterValue.trim() === null) {
//       this.dataSource.filter = this.teamName.trim().toLowerCase();
//     } else {
//       this.dataSource.filter = filterValue.trim().toLowerCase();
//     }
//
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
// }
