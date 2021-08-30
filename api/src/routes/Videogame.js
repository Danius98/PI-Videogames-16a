const axios = require('axios');
const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const router = Router();
const APIKEY = "f648fbbe7d024a9d9b021bbd24cea8b5"
const GAMES = `https://api.rawg.io/api/games?key=${APIKEY}`

router.get('/', async function AllGames(req, res, next) {
    let VideogameAPI = [];
    const pages = [GAMES]
    try {
        const { Titulo } = req.query
        for(let i = 0; i < 5; i++) {
        const response = await axios.get(`${pages[i]}`)
        pages.push(response.data.next)
        //console.log(response)
        const Game = response.data.results.map((e) => {
            let All_games = {
                ID: e.id,
                Titulo: e.name,
                Imagen: e.background_image,
                Lanzamiento: e.released,
                Generos: e.genres,
                Consolas: e.platforms.map((e) => {
                    return e.platform.name
                }),
            };
            return All_games
        })
        VideogameAPI = VideogameAPI.concat(Game)
        //console.log(VideogameAPI)
        }
        const GameDB = await Videogame.findAll({
            include: {
                model: Genre,
                /*attributes: ["Consolas"],
                through: {
                    attributes: [],
                },*/
            },
        });
        VideogameAPI = VideogameAPI.concat(GameDB);
        res.json(VideogameAPI)
    } catch(error) {
        console.error("No hay nada guevon")
    }
})

/*router.get('/', async function AllGames(req, res) {
    let apiGame = [];
    const pages = [Games]
    try {
        const { Titulo } = req.query;
        const GameDB = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ["Consolas"],
                through: {
                    attributes: [],
                },
            },
        });
        console.log(GameDB)
        for(let i = 0; i < 5; i++) {
        const response = await axios.get(`${pages[i]}`);
        pages.push(response.data.next)
        console.log(pages)
        const results = response.data.results.map((e) => {
            let backgame = {
                ID: e.id, 
                Titulo: e.name, 
                Imagen: e.background_image, 
                Lanzamiento: e.released, 
                Generos: e.genres, 
                Consolas: e.platforms.map((e) => {return e.platform
            }),
      };
      return backgame
    })
    apiGame = apiGame.concat(results)
    if(!Titulo) {
        res.status(200).json("mandame esto pelotudito")
    }
   }
 } catch (error){
        console.error("No hay Games")
    }
})*/

module.exports = router;