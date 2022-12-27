import React from "react";
import { Link } from "react-router-dom";
import './Card.css';

export default function GameCard(props) {
    const {   Imagen, ID, Titulo, Generos } = props;
    return (
        <div>
        <div className="cardgame">
           <Link to={`/Videogame/${ID}`}>
           <li className="list-item">
            <div class="cardgame__title">
            <h4 className="name">{Titulo}</h4>
            </div>
           <img width={100}src={Imagen} alt="No imagen"/>
           <div className="align">
              <h5>{Generos?.map((e) => e.Genero).join(' ')}</h5>
           </div>
           </li>
           </Link>
        </div>
        <div className="test">
        <div className="title">
            <h1 class="title_name">Videojuego</h1>
               </div>
        <div class="ola" ><svg class="wave" viewBox="0 0 500 150" preserveAspectRatio="none"><path class="path" d="M-115.97,-8.36 C590.57,-64.61 151.52,63.66 500.00,49.98 L500.00,0.00 L96.22,-7.38 Z"></path></svg></div>
        <div class="informacion">
        <img class="test_img" src="../../img/START.jpg" alt="imagen"/>
        <h2 class="test_genres">Acción, aventura</h2>
        </div>
        </div>
        </div>
    )
};