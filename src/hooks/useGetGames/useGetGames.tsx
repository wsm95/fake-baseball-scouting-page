import { useCallback, useState } from "react";
import { Game } from "../../interfaces/game";
import { useRedditBallApi } from "../useRedditBallApi/useRedditBallApi";

export const useGetGames = (): [
  Game[] | undefined,
  boolean,
  any,
  (season: number, session: number) => Promise<Game[]>
] => {
  const [games, setGames] = useState<Game[]>();
  const { get, response, loading, error } = useRedditBallApi<Game[]>();

  const fetchGameLog = useCallback(
    async (season: number, session: number) => {
      const fetchedGameLog = (await get(
        `games/${season}/${session}`
      )) as Game[];

      if (response.ok) {
        setGames(fetchedGameLog);
      }

      return fetchedGameLog;
    },
    [get, setGames, response]
  );

  return [games, loading, error, fetchGameLog];
};
