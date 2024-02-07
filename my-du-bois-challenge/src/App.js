import "./App.css";
import React from "react";
import GetOverview from "./Overview";

function App() {
  return (
    <div className="App">
      <div id="overview-chart">
        <GetOverview />
      </div>
    </div>
  );
}

export default App;
