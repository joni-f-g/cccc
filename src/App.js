import React from "react";
import Calendar from "./components/Calendar.js";

import "./App.css";

const App = () => (
  <div className="App">
    <header className="App-header">
      <h2 className="title">Covid Childcare Co-op Creator</h2>
      <div className="infoButtons">
        <button>Instructions</button>
        <button>FAQ</button>
        <button>Explainer</button>
        <button>Sample Forms</button>
      </div>
      <Calendar />
    </header>
  </div>
);

export default App;
