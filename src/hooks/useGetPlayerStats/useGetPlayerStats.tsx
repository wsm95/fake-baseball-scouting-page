import { useCallback, useState } from "react";
import { Player } from "../../interfaces/player";
import { useRedditBallApi } from "../useRedditBallApi/useRedditBallApi";

export const useGetPlayerStats = (): [
  Player | undefined,
  boolean,
  any,
  (id: string) => Promise<Player>
] => {
  const [games, setGames] = useState<Player>();
  const { get, response, loading, error } = useRedditBallApi<Player>();

  const fetchPlayerStats = useCallback(
    async (id: string) => {
      const fetchedGameLog = (await get(`players/${id}/stats`)) as Player;

      if (response.ok) {
        setGames(fetchedGameLog);
      }

      return fetchedGameLog;
    },
    [get, setGames, response]
  );

  return [games, loading, error, fetchPlayerStats];
};
