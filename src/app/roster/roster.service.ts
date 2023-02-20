import { Injectable } from '@angular/core';
import {Player} from "../models/player";

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  public players: Array<Player> = [];
  public playerData = data;

  public getPlayers(): Player[] {
    this.players = [];
    this.players.push({fullName: "Cincotta, Tom", firstName:"Tom", lastName:"Cincotta", position:"Goalkeeper", number: 1});
    this.players.push({fullName: "Columba, Alberto", firstName:"Alberto", lastName:"Columba", position:"Forward/Midfield/Defender/Goalkeeper", number: 5});
    this.players.push({fullName: "Derbyshire, Jayme", firstName:"Jayme", lastName:"Derbyshire", position:"Forward/Midfield", number: 3});
    this.players.push({fullName: "Frydl, Mike", firstName:"Mike", lastName:"Frydl", position:"Forward", number: 8});
    this.players.push({fullName: "Furr, Katy", firstName:"Katy", lastName:"Furr", position:"Forward/Midfield/Defender", number: 4});
    this.players.push({fullName: "Jeanneret, Andrew", firstName:"Andrew", lastName:"Jeanneret", position:"Forward/Midfield/Defender", number: 10});
    this.players.push({fullName: "Logan, Brenda", firstName:"Brenda", lastName:"Logan", position:"Midfield/Defender", number: 8});
    this.players.push({fullName: "Logan, Sean", firstName:"Sean", lastName:"Logan", position:"Defender", number: 12});
    this.players.push({fullName: "Mitchener, David", firstName:"David", lastName:"Mitchener", position:"Midfield/Defender", number: 11});
    this.players.push({fullName: "Refo, Mike", firstName:"Mike", lastName:"Refo", position:"Midfield/Defender", number: 14});
    this.players.push({fullName: "Sommer, Tony", firstName:"Tony", lastName:"Sommer", position:"Forward/Midfield", number: 13});
    this.players.push({fullName: "Switzer, Carol", firstName:"Carol", lastName:"Switzer", position:"Goalkeeper", number: 1});
    return this.players;
  }
}

export const data = [
  {fullName: "Cincotta, Tom", firstName:"Tom", lastName:"Cincotta", position:"Goalkeeper", number: 1},
  {fullName: "Columba, Alberto", firstName:"Alberto", lastName:"Columba", position:"Forward/Midfield/Defender/Goalkeeper", number: 5},
  {fullName: "Derbyshire, Jayme", firstName:"Jayme", lastName:"Derbyshire", position:"Forward/Midfield", number: 3},
  {fullName: "Frydl, Mike", firstName:"Mike", lastName:"Frydl", position:"Forward", number: 8},
  {fullName: "Furr, Katy", firstName:"Katy", lastName:"Furr", position:"Forward/Midfield/Defender", number: 4},
  {fullName: "Jeanneret, Andrew", firstName:"Andrew", lastName:"Jeanneret", position:"Forward/Midfield/Defender", number: 10},
  {fullName: "Logan, Brenda", firstName:"Brenda", lastName:"Logan", position:"Midfield/Defender", number: 8},
  {fullName: "Logan, Sean", firstName:"Sean", lastName:"Logan", position:"Defender", number: 12},
  {fullName: "Mitchener, David", firstName:"David", lastName:"Mitchener", position:"Midfield/Defender", number: 11},
  {fullName: "Refo, Mike", firstName:"Mike", lastName:"Refo", position:"Midfield/Defender", number: 14},
  {fullName: "Sommer, Tony", firstName:"Tony", lastName:"Sommer", position:"Forward/Midfield", number: 13},
  {fullName: "Switzer, Carol", firstName:"Carol", lastName:"Switzer", position:"Goalkeeper", number: 1}
];
