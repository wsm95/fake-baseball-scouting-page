import React, { useState, ProviderProps } from "react";

export interface LeagueToggleContextProps {
  currentLeague: "mlr" | "milr";
  setCurrentLeague: React.Dispatch<React.SetStateAction<"mlr" | "milr">>;
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
  const [currentLeague, setCurrentLeague] = useState<"mlr" | "milr">("mlr");

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
