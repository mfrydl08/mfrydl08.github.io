import { Injectable } from '@angular/core';
import {Player} from "../models/player";

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  public players: Array<Player> = [];
  public playerData = data;

  constructor() {}

  public getPlayers(): Player[] {
    this.players = [];
    this.players.push({id: 1, fullName: "Cincotta, Tom", firstName:"Tom", lastName:"Cincotta", position:"Goalkeeper", number: 1});
    this.players.push({id: 2, fullName: "Columba, Alberto", firstName:"Alberto", lastName:"Columba", position:"Forward/Midfield/Defender/Goalkeeper", number: 5});
    this.players.push({id: 3, fullName: "Derbyshire, Jayme", firstName:"Jayme", lastName:"Derbyshire", position:"Forward/Midfield", number: 3});
    this.players.push({id: 4, fullName: "Frydl, Mike", firstName:"Mike", lastName:"Frydl", position:"Forward", number: 8});
    this.players.push({id: 5, fullName: "Furr, Katy", firstName:"Katy", lastName:"Furr", position:"Forward/Midfield/Defender", number: 4});
    this.players.push({id: 6, fullName: "Jeanneret, Andrew", firstName:"Andrew", lastName:"Jeanneret", position:"Forward/Midfield/Defender", number: 10});
    this.players.push({id: 7, fullName: "Logan, Brenda", firstName:"Brenda", lastName:"Logan", position:"Midfield/Defender", number: 8});
    this.players.push({id: 8, fullName: "Logan, Sean", firstName:"Sean", lastName:"Logan", position:"Defender", number: 12});
    this.players.push({id: 9, fullName: "Mitchener, David", firstName:"David", lastName:"Mitchener", position:"Midfield/Defender", number: 11});
    this.players.push({id: 10, fullName: "Refo, Mike", firstName:"Mike", lastName:"Refo", position:"Midfield/Defender", number: 14});
    this.players.push({id: 11, fullName: "Sommer, Tony", firstName:"Tony", lastName:"Sommer", position:"Forward/Midfield", number: 13});
    this.players.push({id: 12, fullName: "Switzer, Carol", firstName:"Carol", lastName:"Switzer", position:"Goalkeeper", number: 1});
    return this.players;
  }
}

export const data = [
  {id: 1, fullName: "Cincotta, Tom", firstName:"Tom", lastName:"Cincotta", position:"Goalkeeper", number: 1},
  {id: 2, fullName: "Columba, Alberto", firstName:"Alberto", lastName:"Columba", position:"Forward/Midfield/Defender/Goalkeeper", number: 5},
  {id: 3, fullName: "Derbyshire, Jayme", firstName:"Jayme", lastName:"Derbyshire", position:"Forward/Midfield", number: 3},
  {id: 4, fullName: "Frydl, Mike", firstName:"Mike", lastName:"Frydl", position:"Forward", number: 8},
  {id: 5, fullName: "Furr, Katy", firstName:"Katy", lastName:"Furr", position:"Forward/Midfield/Defender", number: 4},
  {id: 6, fullName: "Jeanneret, Andrew", firstName:"Andrew", lastName:"Jeanneret", position:"Forward/Midfield/Defender", number: 10},
  {id: 7, fullName: "Logan, Brenda", firstName:"Brenda", lastName:"Logan", position:"Midfield/Defender", number: 8},
  {id: 8, fullName: "Logan, Sean", firstName:"Sean", lastName:"Logan", position:"Defender", number: 12},
  {id: 9, fullName: "Mitchener, David", firstName:"David", lastName:"Mitchener", position:"Midfield/Defender", number: 11},
  {id: 10, fullName: "Refo, Mike", firstName:"Mike", lastName:"Refo", position:"Midfield/Defender", number: 14},
  {id: 11, fullName: "Sommer, Tony", firstName:"Tony", lastName:"Sommer", position:"Forward/Midfield", number: 13},
  {id: 12, fullName: "Switzer, Carol", firstName:"Carol", lastName:"Switzer", position:"Goalkeeper", number: 1}
];
