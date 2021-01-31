import React from "react";
import "./App.css";
import { Routes } from "../routes/Routes";

export const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href="/">Default</a>
          </li>
          <li>
            <a href="/game">Game Page</a>
          </li>
          <li>
            <a href="/player">Player Page</a>
          </li>
        </ul>
      </nav>

      <Routes />
    </div>
  );
};

export default App;
