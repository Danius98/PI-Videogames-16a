import axios from 'axios';
export const GET_VIDEOGAMES = "GET_VIDEOGAMES",
GET_VIDEOGAME_NAME = "GET_VIDEOGAME_NAME",
GET_VIDEOGAME_ID = "GET_VIDEOGAME_ID",
GET_GENEROS = "GET_GENEROS",
NAME_ORDER_A = "NAME_ORDER_A",
NAME_ORDER_Z = "NAME_ORDER_Z",
GENERO = "GENERO",
CREATED = "CREATED",
GAME_RTN_MAX = "GAME_RTN_MAX",
GAME_RTN_MIN = "GAME_RTN_MIN"

export function getVideoGame() {
    return async function(dispatch) {
        try {
            const json = await axios.get("http://localhost:3003/Videogame");
            return dispatch({ type: "GET_VIDEOGAMES", payload: json.data})
        } catch(error) {
            console.log(error)
        };
    }
}

export function getVideoGameName(Titulo) {
    return async function(dispatch) {
        try {
            const json = await axios.get("http://localhost:3003/Videogame?Titulo=" + Titulo);
            return dispatch({ type: "GET_VIDEOGAME_NAME", payload: json.data})
        } catch(error) {
            console.log("No se mostró el Juego")
        }
    }
}

export function getVideogameID(ID) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3003/Videogame/${ID}`);
            return dispatch({ type: "GET_VIDEOGAME_ID", payload: json.data})
        } catch(error) {
            console.log(`No se encontró el Juego con ${ID}`)
        }
    }
}

export function getGeneros() {
    return async function(dispatch) {
        try {
            const json = await axios.get("http://localhost:3003/Generos");
            return dispatch({ type: "GET_GENEROS", payload: json.data})
        } catch(error) {
            console.log("No se mostró el Genero")
        }
    }
}

export function createVideogame(videogame) {
    console.log("Videogame: ", videogame)
    return async function() {
        try {
            const addGame = await axios.post("http://localhost:3003/Videogame", videogame);
            console.log(addGame)
        } catch(error) {
            console.log("No se mostró el Juego")
        }
    }
}

export function Name_OrderA() {
    return {
        type: NAME_ORDER_A,
    }
}

export function Name_OrderZ() {
    return {
        type: NAME_ORDER_Z,
    }
}

export function Genre(payload) {
    return {
        type: GENERO,
        payload
    }
}

export function Created(payload) {
    return {
        type: CREATED,
        payload
    }
}


export function Game_Rtn_Max() {
    return {
    type: GAME_RTN_MAX,
    }
}

export function Game_Rtn_Min() {
    return {
        type: GAME_RTN_MIN,
    }
}