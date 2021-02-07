import { useParams } from "react-router-dom";

interface PlayerPageParams {
  playerId: string;
}

export const PlayerPage: React.FC = () => {
  const { playerId } = useParams<PlayerPageParams>();

  return <> Coming soon: a player page. {playerId}</>;
};
