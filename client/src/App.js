import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home";
import GamesDetail from "./Components/GamesDetail/GamesDetail"
//import Types from "./Components/CreatePokemon/Types"

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route exact path="/Videogame" component={Home}/>
      <Route path="/Videogame/:idGame" component={GamesDetail}/>
    </div>
  );
}

export default App;
