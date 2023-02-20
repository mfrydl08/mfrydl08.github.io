import {LastFive} from "./lastFive";

export class Standing {
  public id = 0
  public teamName = "";
  public wins = 0;
  public draws = 0;
  public losses = 0;
  public points = 0;
  public goalsScored = 0;
  public goalsConceded = 0;
  public goalDiff = 0;
  public matchesPlayed = 0;
  // public lastFive: LastFive = new LastFive();
  public lastFive: string[] = [];
}
