import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home";
import GamesDetail from "./Components/GamesDetail/GamesDetail"
import Games from "./Components/CreateGames/Games"
import Test from "./Components/Videogames/Test"

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route exact path="/Videogame" component={Home}/>
      <Route path="/Videogame/:idCosa" component={GamesDetail}/>
      <Route path="/Videogame/Create" component={Games}/>
      <Route path="/test" component={Test}/>
    </div>
  );
}

export default App;
