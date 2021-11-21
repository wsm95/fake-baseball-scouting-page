import { useCallback, useState } from "react";
import { useLeagueToggleContext } from "../../context/LeagueToggleContext/leagueToggleContext";
import { PlateAppearance } from "../../interfaces/plateAppearance";
import { useSwing420Api } from "../useSwing420Api/useSwing420Api";

export const useGetPlateAppearances = (): [
  PlateAppearance[] | undefined,
  boolean,
  any,
  (
    playerId: string,
    playType: "pitching" | "batting"
  ) => Promise<PlateAppearance[]>
] => {
  const [PlateAppearances, setPlateAppearances] = useState<PlateAppearance[]>();
  const { currentLeague } = useLeagueToggleContext();
  const { get, response, loading, error } = useSwing420Api<PlateAppearance[]>();

  const fetchPlateAppearances = useCallback(
    async (playerId: string, playType: "pitching" | "batting") => {
      const fetchedPlateAppearances = (await get(
        `plateappearances/${playType}/${currentLeague}/${playerId}`
      )) as PlateAppearance[];

      if (response.ok) {
        setPlateAppearances(fetchedPlateAppearances);
      }

      return fetchedPlateAppearances;
    },
    [get, setPlateAppearances, currentLeague, response]
  );

  return [PlateAppearances, loading, error, fetchPlateAppearances];
};
