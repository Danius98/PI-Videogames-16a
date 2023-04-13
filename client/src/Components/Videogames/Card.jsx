import React from "react";
import { Link } from "react-router-dom";
//import { useSelector } from 'react-redux';
import './Card.css';

export default function GameCard(props) {
    const {   Imagen, ID, Titulo, Generos } = props;
    //const videogames = useSelector((state) => state.Videogames)
    //console.log(videogames)
    return (
        <div className="cardgame">
            <div class="cardgame__title">
                {Titulo.length > 20 && Titulo.length <= 32? (
                    <h1 className="name m">{Titulo}</h1>
                ): Titulo.length >32 && Titulo.length <= 40?(
                    <h1 className="name l">{Titulo}</h1>
                ): Titulo.length >40 && Titulo.length <= 45?(
                    <h1 className="name xl">{Titulo}</h1>
                ): Titulo.length >= 45?(
                    <h1 className="name xxl">{Titulo}</h1>
                ):  <h1 className="name s">{Titulo}</h1>}
                <div class="ola" ><svg class="wave" viewBox="0 0 500 150" preserveAspectRatio="none"><path class="path" d="M-115.97,-8.36 C590.57,-64.61 151.52,63.66 500.00,49.98 L500.00,0.00 L96.22,-7.38 Z"></path></svg></div>
            </div>
            <div className="align">
            <Link to={`/Videogame/${ID}`}>
           <img class="image" src={Imagen} alt="No imagen"/>
            {Generos.length >= 40?(
              <h1 class="genre_name">{Generos?.map((e) => e.Genero).join(`\n`)}</h1>
              ): <h1 class="genre_name l">{Generos?.map((e) => e.Genero).join(`\n`)}</h1>}
              </Link>
           </div>
        </div>
    )
    
};
