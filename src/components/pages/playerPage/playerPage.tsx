import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetPlayerStats } from "../../../hooks/useGetPlayerStats/useGetPlayerStats";
import { useGetPlaysByPlayer } from "../../../hooks/useGetPlaysByPlayer/useGetPlaysByPlayer";
import { LineGraph } from "../../lineGraph/lineGraph";

interface PlayerPageParams {
  playerId: string;
}

export const PlayerPage: React.FC = () => {
  const [player, , , fetchPlayerStats] = useGetPlayerStats();
  const [plays, , , fetchPlaysByPlayer] = useGetPlaysByPlayer();
  const { playerId } = useParams<PlayerPageParams>();

  useEffect(() => {
    if (playerId) {
      fetchPlayerStats(playerId);
      fetchPlaysByPlayer(playerId, "pitching");
    }
  }, [playerId, fetchPlayerStats, fetchPlaysByPlayer]);

  return (
    <>
      {" "}
      Coming soon: a player page. {playerId}
      {"\n"}
      {JSON.stringify(player, null, "\n")}
      {"\n"}
      {plays && <LineGraph plays={plays} />}
    </>
  );
};
