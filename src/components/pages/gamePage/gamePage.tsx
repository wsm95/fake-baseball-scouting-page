import { useEffect } from "react";
import { useGetGameLog } from "../../../hooks/useGetGameLog/useGetGameLog";

export const GamePage: React.FC = () => {
  const [gameLogs, loadingGameLogs, , fetchGameLog] = useGetGameLog();

  useEffect(() => {
    fetchGameLog(1432);
  }, [fetchGameLog]);

  return (
    <div>
      {loadingGameLogs ? (
        "Loading..."
      ) : (
        <pre id="json">{JSON.stringify(gameLogs, null, 2)}</pre>
      )}
    </div>
  );
};
