import { BattingStats } from "./battingStats";
import { PitchingStats } from "./pitchingStats";

export interface Player {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  redditName: string;
  battingStats: BattingStats;
  pitchingStats: PitchingStats;
}
