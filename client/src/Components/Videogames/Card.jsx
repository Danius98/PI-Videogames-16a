import React from "react";
import { Link } from "react-router-dom";
import './Card.css';

export default function GameCard(props) {
    const {   Imagen, ID, Titulo, Generos } = props;
    return (
        <div className="card2">
           <Link to={`/Videogame/${ID}`}>
           <li className="list-item">
           <img width={100}src={Imagen} alt="No imagen"/>
           <div className="align">
              <h4 className="name">{Titulo}</h4>
              <h5>{Generos?.map((e) => e.Genero).join(', ')}</h5>
           </div>
           </li>
           </Link>
        </div>
    )
};