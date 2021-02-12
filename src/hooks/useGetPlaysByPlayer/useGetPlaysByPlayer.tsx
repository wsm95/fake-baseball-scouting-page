import { useCallback, useState } from "react";
import { Play } from "../../interfaces/play";
import { useRedditBallApi } from "../useRedditBallApi/useRedditBallApi";

export const useGetPlaysByPlayer = (): [
  Play[] | undefined,
  boolean,
  any,
  (playerId: string, playType: "pitching" | "batting") => Promise<Play[]>
] => {
  const [plays, setPlays] = useState<Play[]>();
  const { get, response, loading, error } = useRedditBallApi<Play[]>();

  const fetchPlaysByPlayer = useCallback(
    async (playerId: string, playType: "pitching" | "batting") => {
      const fetchedPlays = (await get(
        `players/${playerId}/plays/${playType}`
      )) as Play[];

      if (response.ok) {
        setPlays(fetchedPlays);
      }

      return fetchedPlays;
    },
    [get, setPlays, response]
  );

  return [plays, loading, error, fetchPlaysByPlayer];
};
