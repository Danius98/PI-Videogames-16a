import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { getVideogameID } from '../../redux/actions/index.js';
import "./GamesDetail.css"

export default function GameID() {
    const GameDetailed = useSelector((state) => state.GameInfo)
    const dispatch = useDispatch();
    const {idCosa} = useParams();
    useEffect(() => {
        dispatch(getVideogameID(idCosa));
    }, [dispatch, idCosa]);
    console.log(idCosa, `${idCosa}`)
    console.log(GameDetailed, "Detalle del Videojuego")
    //console.log(PokeDetailed.types.map((e) => e.Tipo))
    return (
        <div className="all">
            <button className="buton">
                <Link className="link"to="/Videogame">Home</Link>
            </button>
            <div className="container2">
              <h1>{GameDetailed.Titulo}</h1>
              <div className="imgcontainer">
                  <img src={GameDetailed.Imagen} alt="No se encontró el Videojuego"/>
              </div>
              <div className="table">
                 {/*<h3>Titulo: {GameDetailed.Titulo}</h3>
                 <h3>Imagen: {GameDetailed.Imagen}</h3>*/}
                 <h3>Lanzamiento: {GameDetailed.Lanzamiento}</h3>
                 <h5>Descripción: {GameDetailed.Descripcion?.replace(/<[^>]*>?/g,'')}</h5>
                 <h3>Rating: {GameDetailed.Rating}</h3>
                 <h3>Consolas: {GameDetailed.Consolas?.join(', ')}</h3>
                 <h3>Generos:{GameDetailed.Generos?.map((e) => e.Genero).join(', ')}{!GameDetailed.Generos && <h3>Generos:</h3>} </h3>
                 </div>
            </div>
        </div>
    )
}

/*Name
Gender
Race
Height
Weight
Eye Color 
Hair Color*/

