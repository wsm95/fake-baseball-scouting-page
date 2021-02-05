import { useCallback, useState } from "react";
import { Game } from "../../interfaces/game";
import { useRedditBallApi } from "../useRedditBallApi/useRedditBallApi";

export const useGetActiveGame = (): [
  Game | undefined,
  boolean,
  any,
  (teamTag: string) => Promise<Game>
] => {
  const [activeGame, setActiveGame] = useState<Game>();
  const { get, response, loading, error } = useRedditBallApi<Game>();

  const fetchActiveGame = useCallback(
    async (teamTag: string) => {
      const fetchedActiveGame = (await get(`/games/active/${teamTag}`)) as Game;

      if (response.ok) {
        setActiveGame(fetchedActiveGame);
      }

      return fetchedActiveGame;
    },
    [get, setActiveGame, response]
  );

  return [activeGame, loading, error, fetchActiveGame];
};
