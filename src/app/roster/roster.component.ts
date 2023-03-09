//Roadkill Version
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Player} from "../models/player";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {StandingsService} from "../standings/standings.service";

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
  @Input() teamName!: string;

  public players: Array<Player> = [];
  public dataSource = new MatTableDataSource();

  initColumns = [
    { name: 'fullName', display: 'Name' },
    { name: 'position', display: 'Position' },
    { name: 'number', display: 'Jersey Number' },
  ];

  public displayedColumns = this.initColumns.map((col) => col.name);

  @ViewChild(MatSort, { static: true }) sort!: MatSort

    constructor(private route: ActivatedRoute,
                private httpClient: HttpClient,
                public standingsService: StandingsService) {
  }

  public ngOnInit() {
    this.httpClient.get("assets/rosterData.json").subscribe(data =>{
      const players = <Player[]>data;
      const filteredData = players.filter((player) => player.teamName === "Roadkill");
      this.dataSource.data = filteredData;
    });

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

// //All Teams Version
// import {Component, Input, OnInit, ViewChild} from '@angular/core';
// import {Player} from "../models/player";
// import {MatTableDataSource} from "@angular/material/table";
// import {MatSort} from "@angular/material/sort";
// import {HttpClient} from "@angular/common/http";
// import {Location} from "@angular/common";
// import {ActivatedRoute} from "@angular/router";
// import {StandingsService} from "../standings/standings.service";
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
//   public dataSource = new MatTableDataSource();
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
//   constructor(private location: Location,
//               private route: ActivatedRoute,
//               private httpClient: HttpClient,
//               public standingsService: StandingsService) {
//   }
//
//   public ngOnInit() {
//     const id = parseInt(<string>this.route.snapshot.paramMap.get('id'), 10);
//
//     this.teamName = this.standingsService.getTeamNameById(id);
//
//     this.httpClient.get("assets/rosterData.json").subscribe(data =>{
//       const players = <Player[]>data;
//       const filteredData = players.filter((player) => player.teamName === this.teamName);
//
//       this.dataSource.data = filteredData;
//     });
//
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
//
//   public goBack(): void {
//     this.location.back();
//   }
// }
