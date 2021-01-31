import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { GamePage } from "../pages/gamePage/gamePage";
import { PlayerPage } from "../pages/playerPage/playerPage";

export const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Redirect exact from="/" to="/game" />
          <Route path="/game">
            <GamePage />
          </Route>
          <Route path="/player">
            <PlayerPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
