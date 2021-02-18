import { Player } from "../../interfaces/player";

interface PlayerStatsProps {
  player: Player;
  statType: "pitching" | "batting";
}

export const PlayerStats = (props: PlayerStatsProps) => {
  const { player } = props;
  console.log(player);
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h3>{`${player.firstName} ${player.lastName}`}</h3>
    </div>
  );
};
