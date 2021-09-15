import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home";
import GamesDetail from "./Components/GamesDetail/GamesDetail"
import Games from "./Components/CreateGames/Games"

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route exact path="/Videogame" component={Home}/>
      <Route path="/Videogame/:idGame" component={GamesDetail}/>
      <Route path="/Videogame/Create" component={Games}/>
    </div>
  );
}

export default App;
