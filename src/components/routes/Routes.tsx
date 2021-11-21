import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import { LeagueToggleContextProvider } from "../../context/LeagueToggleContext/leagueToggleContext";
import { GamePage } from "../pages/gamePage/gamePage";
import { PlayerPage } from "../pages/playerPage/playerPage";

export const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/mlr" />
        <Route path="/:currentLeague">
          <LeagueToggleContextProvider>
            <Pages />
          </LeagueToggleContextProvider>
        </Route>
      </Switch>
    </Router>
  );
};

const Pages = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Redirect exact from={path} to={`${path}/game`} />
      <Route path={`${path}/game`}>
        <GamePage />
      </Route>
      <Route path={`${path}/player/:playType?/:playerId?`}>
        <PlayerPage />
      </Route>
    </Switch>
  );
};
