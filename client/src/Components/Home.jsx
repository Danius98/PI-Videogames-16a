import React, { useEffect } from "react";
import { getVideoGame } from "../redux/actions/index.js";
import { useDispatch } from "react-redux";
import Videogames from "./Videogames/Videogames";
import NavBar from "./NavBar/NavBar";

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideoGame());
    }, [dispatch])
    return (
        <div>
            <h2>Hola a todos</h2>
            <NavBar/>
            <div>
                {<Videogames/>}
            </div>/
        </div>
    )
}