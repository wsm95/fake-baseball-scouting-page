export interface PlateAppearance {
  paID: number;
  league: string;
  season: number;
  session: number;
  gameID: number;
  inning: string;
  inningID: number;
  playNumber: number;
  outs: number;
  obc: number;
  awayScore: number;
  homeScore: number;
  pitcherTeam: string;
  pitcherName: string;
  pitcherID: number;
  hitterTeam: string;
  hitterName: string;
  hitterID: number;
  pitch: number;
  swing: number;
  diff: number;
  exactResult: string;
  oldResult: string;
  resultAtNeutral: string;
  resultAllNeutral: string;
  rbi: number;
  run: boolean;
  batterWPA: string;
  pitcherWPA: string;
  pr3B: number;
  pr2B: number;
  pr1B: number;
  prAB: number;
}
