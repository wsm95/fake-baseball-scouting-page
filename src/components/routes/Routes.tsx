import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { GamePage } from "../pages/gamePage/gamePage";
import { PlayerPage } from "../pages/playerPage/playerPage";

export const Routes: React.FC = () => {
  return (
    <Router basename="/fake-baseball-scouting-page/">
      <nav>
        <ul>
          <li>
            <Link to="/">Default</Link>
          </li>
          <li>
            <Link to="/game">Game Page</Link>
          </li>
          <li>
            <Link to="/player">Player Page</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Redirect exact from="/" to="/game" />
        <Route path="/game">
          <GamePage />
        </Route>
        <Route path="/player">
          <PlayerPage />
        </Route>
      </Switch>
    </Router>
  );
};
