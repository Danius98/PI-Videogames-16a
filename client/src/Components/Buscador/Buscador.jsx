import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideoGame, getVideoGameName } from '../../redux/actions/index.js';
import "./Buscador.css";

export default function Buscador() {
    const[input, setInput] = useState('');
    const dispatch = useDispatch();
    const inputHandler = (e) => {
        setInput(e.target.value)
    };
    const onClickHandler = () => {
        dispatch(getVideoGameName(input));
    };
    const HomeHandler = () => {
        dispatch(getVideoGame());
    };
    return (
        <div className="container">
            <input className="inputtext"
            type="text"
            placeholder="Busca tu Juego"
            name="input"
            onChange={(e) => inputHandler(e)}
            />
            <div>
                <button onClick={() => onClickHandler()} className="btnSearch">Buscar</button>
                <button onClick={() => HomeHandler()} className="btnSearch">Reestablecer</button>
            </div>
        </div>
    )
}