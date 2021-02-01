import { useCallback, useState } from "react";
import { Game } from "../../interfaces/game";
import { useMLRApi } from "../useMLRApi/useMLRApi";

export const useGetGames = (): [
  Game[] | undefined,
  boolean,
  any,
  (season: number, session: number) => Promise<Game[]>
] => {
  const [games, setGames] = useState<Game[]>();
  const { get, response, loading, error } = useMLRApi<Game[]>();

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
