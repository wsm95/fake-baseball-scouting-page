import { Team } from "./team";

export interface Game {
  id: number;
  season: number;
  session: number;
  awayTeam: Team;
  homeTeam: Team;
  awayScore: number;
  homeScore: number;
  completed: boolean;
  outs: number;
  inning: string;
  firstOccupied: boolean;
  secondOccupied: boolean;
  thirdOccupied: boolean;
  id36: string;
}
