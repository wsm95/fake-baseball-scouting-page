import React from "react";
import "./App.css";
import { Routes } from "../routes/Routes";

import "rsuite/dist/styles/rsuite-default.css";

export const App: React.FC = () => {
  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default App;
