import { useCallback, useState } from "react";
import { Play } from "../../interfaces/play";
import { useMLRApi } from "../useMLRApi/useMLRApi";

export const useGetGameLog = (): [
  Play[] | undefined,
  boolean,
  any,
  (gameId: number) => Promise<Play[]>
] => {
  const [gameLog, setGameLog] = useState<Play[]>();
  const { get, response, loading, error } = useMLRApi<Play[]>();

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
