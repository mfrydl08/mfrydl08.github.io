import {Injectable} from '@angular/core';
import {Teams} from "../models/teams";
import {AppService} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  public teamList: Teams[] = [];
  constructor(public appService: AppService) {
    this.getTeamsList();
  }

  public getTeamNameById(id: number): string {
    let teamName = "";

    const found = this.teamList.find(item => item.id === id);
    if (found) {
      teamName = found.teamName;
    }

    return teamName;
  }

  public getTeamsList(): Teams[] {
    this.teamList = [];

    switch (this.appService.selectedSessionValue) {
      case "0":
        this.teamList.push(
          {id: 1, teamName:"Absinthe Minded"},
          {id: 2, teamName:"Agony of Da Feet"},
          {id: 3, teamName:"Blue City"},
          {id: 4, teamName:"Internationals"},
          {id: 5, teamName:"Jolly Green Giants"},
          {id: 6, teamName:"KMP"},
          {id: 7, teamName:"Mustangs FC"},
          {id: 8, teamName:"Roadkill"},
          {id: 9, teamName:"Rusty Knights"}
        );
        break;
      case '1':
        this.teamList.push(
          {id: 1, teamName:"Absinthe Minded"},
          {id: 2, teamName:"Agony of Da Feet"},
          {id: 3, teamName:"Blue City"},
          {id: 4, teamName:"Internationals"},
          {id: 5, teamName:"Jolly Green Giants"},
          {id: 6, teamName:"KMP"},
          {id: 7, teamName:"Mustangs FC"},
          {id: 8, teamName:"Roadkill"},
          {id: 9, teamName:"Rusty Knights"},
          {id: 10, teamName: "FC Frederick Aces"}
        );
        break;
      case '2':

    }

    return this.teamList.sort((a,b) => a.teamName.localeCompare(b.teamName));
  }
}
