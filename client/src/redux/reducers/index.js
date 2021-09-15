import { 
GET_VIDEOGAMES,
GET_VIDEOGAME_NAME,
GET_VIDEOGAME_ID,
GET_PLATFORMS,
GET_GENEROS,
NAME_ORDER_A,
NAME_ORDER_Z,
GENERO,
CREATED,
GAME_RTN_MAX,
GAME_RTN_MIN } from '../actions/index.js';

const Title_Order = (a, b) => {
    if(a.Titulo < b.Titulo) return -1
    if(a.Titulo > b.Titulo) return 1
    return 0
  }

  const Rtn_Order = (a, b) => {
    if(a.Rating < b.Rating) return -1
    if(a.Rating > b.Rating) return 1
    return 0
}

const initialState = {
    Videogames: [],
    ExactGame: [],
    GameInfo: [],
    Generos: [],
    Consolas: {}
}

function rootReducer(state = initialState, action) {
    if(action.type === GET_VIDEOGAMES) {
        return {
            ...state,
            Videogames: action.payload,
            ExactGame: action.payload
        };
    }
    if(action.type === GET_VIDEOGAME_NAME) {
        return {
            ...state,
            Videogames: action.payload
        };
    }
    if(action.type === GET_VIDEOGAME_ID) {
        return {
            ...state,
            GameInfo: action.payload
        }
    }
    if(action.type === GET_PLATFORMS) {
        return {
            ...state,
            Consolas: action.payload
        };
    }
    if(action.type === GET_GENEROS) {
        return {
            ...state,
            Generos: action.payload
        };
    }
    if(action.type === NAME_ORDER_A) {
        return {
            ...state,
            Videogames: state.Videogames.slice().sort(Title_Order)
        }
    };
    if(action.type === NAME_ORDER_Z) {       
         return {
            ...state,
            Videogames: state.Videogames.slice().sort(Title_Order).reverse()
        }
    };
    if(action.type === GENERO) {
        const allGames = state.Videogames
        const typeFilter = 
        action.payload === "allGenre" 
        ? allGames
        : allGames.filter(({Generos}) => {
                return Generos.find(({Genero}) => Genero === action.payload)}
                 )
                 return {
                     ...state,
                     Videogames: typeFilter,
                 }
    };
    if(action.type === CREATED) {
        const Existe = state.ExactGame
        let createdFilter;
        if(action.payload === "Todo") {
            createdFilter = Existe
        }
        if(action.payload === "true") {
            createdFilter = Existe.filter((e) => e.Creado === true)
        }
        if(action.payload === "false") {
            createdFilter = Existe.filter((e) => e.Creado === false)
        }
        return  {
                ...state,
                Videogames: createdFilter,
                 }
    };
    if(action.type === GAME_RTN_MAX) {
        return {
            ...state,
            Videogames: state.Videogames.slice().sort(Rtn_Order).reverse()
        }
    }
    if(action.type === GAME_RTN_MIN) {
        return {
            ...state,
            Videogames: state.Videogames.slice().sort(Rtn_Order)
        }
    }
    return state;
}

export default rootReducer;