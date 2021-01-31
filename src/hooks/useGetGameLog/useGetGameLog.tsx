import { useCallback, useState } from "react";
import { useMLRApi } from "../useMLRApi/useMLRApi";

export const useGetGameLog = (): [
  any,
  boolean,
  any,
  (gameId: number) => Promise<any>
] => {
  const [gameLog, setGameLog] = useState();
  const { get, post, response, loading, error } = useMLRApi();

  const fetchGameLog = useCallback(
    async (gameId: number) => {
      const fetchedGameLog = await get(`games/${gameId}/log`);

      if (response.ok) {
        setGameLog(fetchedGameLog);
      }

      return fetchedGameLog;
    },
    [get, setGameLog, response]
  );

  return [gameLog, loading, error, fetchGameLog];
};
