import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getVideoGame, Name_OrderA, Name_OrderZ, Genre, Created, Game_Rtn_Max, Game_Rtn_Min} from '../../redux/actions/index.js';
import Buscador from '../Buscador/Buscador.jsx';
import './NavBar.css';

const NavBar = ({getVideoGame, Name_OrderA, Name_OrderZ, Genre, Created, Game_Rtn_Max, Game_Rtn_Min}) => {
    const[Order, setOrder] = useState('');
    const[Genero, setGenre] = useState('');
    const[Creado, setCreado] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
            if(Genero === "allGenre") {
                getVideoGame()
            }else{
                setTimeout(() => {
                    dispatch(Genre(Genero))
                }, 1000)
            }
    }, [Genero, getVideoGame, dispatch]);
    useEffect(() => {
        if(Creado) {
                setTimeout(() => {
                    dispatch(Created(Creado))
                }, 1000)
            }
    }, [Creado, getVideoGame, dispatch]);
    useEffect(() => {
        if(Order === "Todos") getVideoGame();
        else if(Order === "A-Z") Name_OrderA();
        else if(Order === "Z-A") Name_OrderZ();
        else if(Order === "Mayor Rating") Game_Rtn_Max();
        else if(Order === "Menor Rating") Game_Rtn_Min();
    }, [Order, setOrder])
    console.log(Genero)
    return (
        <header className="navbar">
            <div className="list">
                <Link className="landingLink" to="/">
                <svg className="landingLink__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"/></svg>
                <p className='landingLink__text'>Home</p>
                </Link>
                <div className="list-item">
                    <h5 className="order">Ordenado Según:</h5>
                    <select onChange={(event) => setOrder(event.target.value)}>
                        <option value="Todos">Todos</option>
                        <option value="A-Z">Alfabético A-Z</option>
                        <option value="Z-A">Alfabético Z-A</option>
                        <option value="Mayor Rating">Mayor Rating</option>
                        <option value="Menor Rating">Menor Rating</option>
                    </select>
                    <Buscador/>
                </div>
                <div className="continent">
                    <h5>Filtrado por Creado</h5>
                    <div>
                        <select onChange={(event) => setCreado(event.target.value)}>
                        <option value="Todo">Todos</option>
                          <option value="false">Existente</option>
                          <option value="true">Creado</option>
                        </select>                   
                    </div>
                </div>
                <div className="continent">
                    <h5>Filtrado por Tipo</h5>
                    <div>
                        <select onChange={(event) => setGenre(event.target.value)}>
                          <option value="allGenre">Todos</option>
                          <option value="Action">Action</option>
                          <option value="RPG">RPG</option>
                          <option value="Indie">Indie</option>
                          <option value="Adventure">Adventure</option>
                          <option value="Shooter">Shooter</option>
                          <option value="Casual">Casual</option>
                          <option value="RPG">RPG</option>
                          <option value="Strategy">Strategy</option>
                          <option value="Simulation">Simulation</option>
                          <option value="Puzzle">Puzzle</option>
                          <option value="Platformer">Platformer</option>
                          <option value="Racing">Racing</option>
                          <option value="Massively Multiplayer">Massively Multiplayer</option>
                          <option value="Sports">Sports</option>
                          <option value="Fighting">Fighting</option>
                          <option value="Family">Family</option>
                          <option value="Board Games">Board Games</option>
                          <option value="Educational">Educational</option>
                          <option value="Card">Card</option>
                        </select>                   
                    </div>
                </div>
                <div>
                        <Link className="link" to="/Videogame/Create">
                            <h5>Crea un Videojuego</h5>
                        </Link>
                </div>
            </div>
        </header>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVideoGame: () => dispatch(getVideoGame()),
        Name_OrderA: () => dispatch(Name_OrderA()),
        Name_OrderZ: () => dispatch(Name_OrderZ()),
        Genre: (Genero) => dispatch(Genre(Genero)),
        Created: (Creado) => dispatch(Created(Creado)),
        Game_Rtn_Max: () => dispatch(Game_Rtn_Max()),
        Game_Rtn_Min: () => dispatch(Game_Rtn_Min())
    }
}

const mapStateToProps = (state) => {
    return {
        Videogames: state.Videogames
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)