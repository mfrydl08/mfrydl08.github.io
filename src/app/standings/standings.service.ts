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
          {id: 1, division: 1, teamName:"Absinthe Minded"},
          {id: 2, division: 1, teamName:"Agony of Da Feet"},
          {id: 3, division: 1, teamName:"Blue City"},
          {id: 4, division: 1, teamName:"Internationals"},
          {id: 5, division: 1, teamName:"Jolly Green Giants"},
          {id: 6, division: 1, teamName:"KMP"},
          {id: 7, division: 1, teamName:"Mustangs FC"},
          {id: 8, division: 1, teamName:"Roadkill"},
          {id: 9, division: 1, teamName:"Rusty Knights"}
        );
        break;
      case '1':
        this.teamList.push(
          {id: 1, division: 1, teamName:"Absinthe Minded"},
          {id: 2, division: 1, teamName:"Agony of Da Feet"},
          {id: 3, division: 1, teamName:"Blue City"},
          {id: 4, division: 1, teamName:"Internationals"},
          {id: 5, division: 1, teamName:"Jolly Green Giants"},
          {id: 6, division: 1, teamName:"KMP"},
          {id: 7, division: 1, teamName:"Mustangs FC"},
          {id: 8, division: 1, teamName:"Roadkill"},
          {id: 9, division: 1, teamName:"Rusty Knights"},
          {id: 10, division: 1, teamName: "FC Frederick Aces"}
        );
        break;
      case '2':
        this.teamList.push(
          {id: 1, division: 1, teamName:"Absinthe Minded"},
          {id: 2, division: 1, teamName:"Agony of Da Feet"},
          {id: 3, division: 1, teamName:"Blue City"},
          {id: 4, division: 1, teamName:"Mustang"},
          {id: 5, division: 2, teamName:"Internationals"},
          {id: 6, division: 2, teamName:"Jolly Green Giants"},
          {id: 7, division: 2, teamName:"KMP"},
          {id: 8, division: 2, teamName:"Roadkill"},
          {id: 9, division: 2, teamName:"Rusty Knights"},
          {id: 10, division: 2, teamName: "Frederick Aces"},
          {id: 11, division: 2, teamName: "Point of Rocks"}
        );
        break;

    }

    return this.teamList.sort((a,b) => a.teamName.localeCompare(b.teamName));
  }
}
