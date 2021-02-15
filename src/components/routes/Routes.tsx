import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { GamePage } from "../pages/gamePage/gamePage";
import { PlayerPage } from "../pages/playerPage/playerPage";

export const Routes: React.FC = () => {
  return (
    <Router basename="/fake-baseball-scouting-page/">
      <Switch>
        <Redirect exact from="/" to="/game" />
        <Route path="/game">
          <GamePage />
        </Route>
        <Route path="/player/:playerId/:playType">
          <PlayerPage />
        </Route>
      </Switch>
    </Router>
  );
};
