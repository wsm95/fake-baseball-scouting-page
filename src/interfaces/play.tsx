import { Game } from "./game";
import { Player } from "./player";
import { Result } from "./result";

export interface Play {
  id: number;
  game: Game;
  batter: Player;
  swing: number;
  pitcher: Player;
  pitch: number;
  diff: number;
  result: string;
  beforeState: Result;
  afterState: Result;
  outsTracked: number;
  runsScored: number;
  scorers: string;
}
