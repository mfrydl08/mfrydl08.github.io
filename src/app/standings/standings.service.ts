import {Injectable} from '@angular/core';
import {Teams} from "../models/teams";

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  public teamList: Teams[] = [];
  constructor() {
    this.getTeams();
  }

  public getTeamNameById(id: number): string {
    let teamName = "";

    const found = this.teamList.find(item => item.id === id);
    if (found) {
      teamName = found.teamName;
    }

    return teamName;
  }

  public getTeams() {
    this.teamList.push(
      {id: 1, teamName:"Absinthe Minded"},
      {id: 2, teamName:"Agony of Da Feet"},
      {id: 3, teamName:"Blue City"},
      {id: 4, teamName:"Internationals"},
      {id: 5, teamName:"Jolly Green Giants"},
      {id: 6, teamName:"KMP"},
      {id: 7, teamName:"Roadkill"},
      {id: 8, teamName:"Rusty Knights"}
    );

    this.teamList.sort((a,b) => a.teamName.localeCompare(b.teamName));
  }
}
