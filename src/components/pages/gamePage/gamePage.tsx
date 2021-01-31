import { useEffect } from "react";
import { useGetGameLog } from "../../../hooks/useGetGameLog/useGetGameLog";

export const GamePage: React.FC = () => {
  const [gameLogs, loadingGameLogs, , fetchGameLog] = useGetGameLog();

  useEffect(() => {
    fetchGameLog(1432);
  }, [fetchGameLog]);

  return (
    <div>
      Coming soon: a game page.
      {loadingGameLogs ? "Loading..." : JSON.stringify(gameLogs, null, 2)}
    </div>
  );
};
