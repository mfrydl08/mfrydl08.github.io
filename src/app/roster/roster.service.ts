import { Injectable } from '@angular/core';
import {Player} from "../models/player";

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  public players: Array<Player> = [];
  public playerData = data;

  public getPlayers(teamName: string) {
    this.players = [];
    data.forEach(player => {
      if (player.teamName.toLowerCase() === teamName.toLowerCase()) {
        this.players.push(player);
      }
    });
  }
}

export const data = [
  {teamName: "Roadkill", fullName: "Cincotta, Tom", firstName: "Tom", lastName: "Cincotta", position: "Goalkeeper", number: 1},
  {teamName: "Roadkill", fullName: "Columba, Alberto", firstName: "Alberto", lastName: "Columba", position: "Forward/Midfield/Defender/Goalkeeper", number: 5},
  {teamName: "Roadkill", fullName: "Derbyshire, Jayme", firstName: "Jayme", lastName: "Derbyshire", position: "Forward/Midfield", number: 3},
  {teamName: "Roadkill", fullName: "Frydl, Mike", firstName: "Mike", lastName: "Frydl", position: "Forward", number: 8},
  {teamName: "Roadkill", fullName: "Furr, Katy", firstName: "Katy", lastName: "Furr", position: "Forward/Midfield/Defender", number: 4},
  {teamName: "Roadkill", fullName: "Jeanneret, Andrew", firstName: "Andrew", lastName: "Jeanneret", position: "Forward/Midfield/Defender", number: 10},
  {teamName: "Roadkill", fullName: "Logan, Brenda", firstName: "Brenda", lastName: "Logan", position: "Midfield/Defender", number: 8},
  {teamName: "Roadkill", fullName: "Logan, Sean", firstName: "Sean", lastName: "Logan", position: "Defender", number: 12},
  {teamName: "Roadkill", fullName: "Mitchener, David", firstName: "David", lastName: "Mitchener", position: "Midfield/Defender", number: 11},
  {teamName: "Roadkill", fullName: "Refo, Mike", firstName: "Mike", lastName: "Refo", position: "Midfield/Defender", number: 14},
  {teamName: "Roadkill", fullName: "Sommer, Tony", firstName: "Tony", lastName: "Sommer", position: "Forward/Midfield", number: 13},
  {teamName: "Roadkill", fullName: "Switzer, Carol", firstName: "Carol", lastName: "Switzer", position: "Goalkeeper", number: 1}
];

// export const data = [
//   {teamName: "Roadkill", fullName: "Cincotta, Tom", firstName: "Tom", lastName: "Cincotta", position: "Goalkeeper", number: 1},
//   {teamName: "Roadkill", fullName: "Columba, Alberto", firstName: "Alberto", lastName: "Columba", position: "Forward/Midfield/Defender/Goalkeeper", number: 5},
//   {teamName: "Roadkill", fullName: "Derbyshire, Jayme", firstName: "Jayme", lastName: "Derbyshire", position: "Forward/Midfield", number: 3},
//   {teamName: "Roadkill", fullName: "Frydl, Mike", firstName: "Mike", lastName: "Frydl", position: "Forward", number: 8},
//   {teamName: "Roadkill", fullName: "Furr, Katy", firstName: "Katy", lastName: "Furr", position: "Forward/Midfield/Defender", number: 4},
//   {teamName: "Roadkill", fullName: "Jeanneret, Andrew", firstName: "Andrew", lastName: "Jeanneret", position: "Forward/Midfield/Defender", number: 10},
//   {teamName: "Roadkill", fullName: "Logan, Brenda", firstName: "Brenda", lastName: "Logan", position: "Midfield/Defender", number: 8},
//   {teamName: "Roadkill", fullName: "Logan, Sean", firstName: "Sean", lastName: "Logan", position: "Defender", number: 12},
//   {teamName: "Roadkill", fullName: "Mitchener, David", firstName: "David", lastName: "Mitchener", position: "Midfield/Defender", number: 11},
//   {teamName: "Roadkill", fullName: "Refo, Mike", firstName: "Mike", lastName: "Refo", position: "Midfield/Defender", number: 14},
//   {teamName: "Roadkill", fullName: "Sommer, Tony", firstName: "Tony", lastName: "Sommer", position: "Forward/Midfield", number: 13},
//   {teamName: "Roadkill", fullName: "Switzer, Carol", firstName: "Carol", lastName: "Switzer", position: "Goalkeeper", number: 1},
//   {teamName: "Blue City", fullName: "Martinez, Jose", firstName: "Jose", lastName: "Martinez", position: "Defender", number: 1},
//   {teamName: "Blue City", fullName: "Rodriguez, Jesus", firstName: "Jesus", lastName: "Rodriguez", position: "Forward", number: 2}
// ];
