import { useCallback, useState } from "react";
import { Player } from "../../interfaces/player";
import { useRedditBallApi } from "../useRedditBallApi/useRedditBallApi";

export const useSearchPlayerByName = (): [
  Player[] | undefined,
  boolean,
  any,
  (searchTerm: string) => Promise<Player[]>
] => {
  const [players, setPlayers] = useState<Player[]>([]);
  const { get, response, loading, error } = useRedditBallApi<Player[]>();

  const searchPlayerByName = useCallback(
    async (searchTerm: string) => {
      const searchedPlayers = (await get(
        `players/search?query=${searchTerm}`
      )) as Player[];

      if (response.ok) {
        setPlayers(searchedPlayers);
      }

      return searchedPlayers;
    },
    [get, setPlayers, response]
  );

  return [players, loading, error, searchPlayerByName];
};
