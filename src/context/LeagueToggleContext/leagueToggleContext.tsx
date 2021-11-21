import React, { ProviderProps } from "react";
import { useParams, useHistory } from "react-router-dom";

export interface LeagueToggleContextProps {
  currentLeague: "mlr" | "milr";
  setCurrentLeague: (newLeague: "mlr" | "milr") => void;
}

interface LeagueContextParams {
  currentLeague: "mlr" | "milr";
}

interface LeagueToggleContextProviderProps
  extends Omit<ProviderProps<LeagueToggleContextProps>, "value"> {}

export const LeagueToggleContext = React.createContext<
  LeagueToggleContextProps
>({
  currentLeague: "mlr",
  setCurrentLeague: () => {}
});

export const LeagueToggleContextProvider = (
  props: LeagueToggleContextProviderProps
) => {
  // const [currentLeague, setCurrentLeague] = useState<"mlr" | "milr">("mlr");

  const { currentLeague } = useParams<LeagueContextParams>();
  const history = useHistory();

  const setCurrentLeague = (newLeague: "mlr" | "milr") => {
    return history.replace(
      history.location.pathname
        .replace("mlr", newLeague)
        .replace("milr", newLeague)
    );
  };

  return (
    <LeagueToggleContext.Provider
      value={{ currentLeague, setCurrentLeague }}
      {...props}
    />
  );
};

export const useLeagueToggleContext = () => {
  const context = React.useContext(LeagueToggleContext);
  if (context == null) {
    throw new Error("LeagueToggleContext must be used inside provider");
  }
  return context;
};
