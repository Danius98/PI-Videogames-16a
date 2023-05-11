import React, { useEffect } from "react";
import { getVideoGame } from "../redux/actions/index.js";
import { useDispatch } from "react-redux";
import Videogames from "./Videogames/Videogames.jsx";
import NavBar from "./NavBar/NavBar_copy";

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideoGame());
    }, [dispatch])
    return (
        <section>
            <NavBar/>
                <Videogames/>
        </section>
    )
}