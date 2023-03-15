import React, { useEffect } from 'react';
import { getVideoGame } from "../../redux/actions/index.js";
import GameCard from './Card_2.jsx';
import { useDispatch, useSelector} from "react-redux";
import "./Videogames.css"

export default function Test(props) {
    const videogames = useSelector((state) => state.Videogames)
    const dispatch = useDispatch();
    //const {Titulo} = props
    useEffect(() => {
        dispatch(getVideoGame());
    }, [dispatch])
    console.log(videogames)
    const casa = () => {
        let array = []
        for(var i = 0; i < videogames.length; i++){
            const juego = videogames[i]
            if(juego.Titulo.length > 30 && juego.Titulo.length < 50){
                array.push(juego)
            }
        }
        return array
    }
    console.log(casa())
    return(
        <div>
            {videogames.map((e) => (
            <GameCard
            Titulo = {e.Titulo}
            />
            ))}
            <h1>HOLA ESTO ES UNA PRUEBA</h1>
        </div>
    )
}