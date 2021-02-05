import { useCallback, useState } from "react";
import { Play } from "../../interfaces/play";
import { useRedditBallApi } from "../useRedditBallApi/useRedditBallApi";

export const useGetGameLog = (): [
  Play[] | undefined,
  boolean,
  any,
  (gameId: number) => Promise<Play[]>
] => {
  const [gameLog, setGameLog] = useState<Play[]>();
  const { get, response, loading, error } = useRedditBallApi<Play[]>();

  const fetchGameLog = useCallback(
    async (gameId: number) => {
      const fetchedGameLog = (await get(`games/${gameId}/log`)) as Play[];

      if (response.ok) {
        setGameLog(fetchedGameLog);
      }

      return fetchedGameLog;
    },
    [get, setGameLog, response]
  );

  return [gameLog, loading, error, fetchGameLog];
};
