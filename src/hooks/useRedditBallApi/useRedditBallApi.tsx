import useFetch from "use-http";
import { useLeagueToggleContext } from "../../context/LeagueToggleContext/leagueToggleContext";

export const useRedditBallApi = <T,>(apiVerson: string = "v1") => {
  const { currentLeague } = useLeagueToggleContext();

  return useFetch<T>(
    `https://${
      currentLeague === "milr" ? currentLeague + "." : ""
    }redditball.com/api/${apiVerson}`
  );
};
