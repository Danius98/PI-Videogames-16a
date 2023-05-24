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
        console.log(input)
    };
    const HomeHandler = () => {
        dispatch(getVideoGame());
    };
    return (
        <div className="searchBar">
            <input className="searchBar__input"
            type="text"
            placeholder="Busca tu Juego"
            name="input"
            onChange={(e) => inputHandler(e)}
            />
            <div className='searchBar__buttons'>
                <button onClick={() => onClickHandler()} className="searchBar__buttons--search">
                <svg className="searchBar__icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"/></svg>
                    </button>
                <button onClick={() => HomeHandler()} className="searchBar__buttons--default">
                <svg className="searchBar__icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"/></svg>
                    </button>
            </div>
        </div>
    )
}