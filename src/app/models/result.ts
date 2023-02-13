import {Game} from "./game";

export class Result {
  public win: boolean = false;
  public draw: boolean = false;
  public loss: boolean = false;
  public gameInfo: Game = new Game();
}
