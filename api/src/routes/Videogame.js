const axios = require('axios');
const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const router = Router();
const APIKEY = "f648fbbe7d024a9d9b021bbd24cea8b5"
const GAMES = `https://api.rawg.io/api/games?key=${APIKEY}`
//const GAMESID = `https://api.rawg.io/api/games/${id}?key=${APIKEY}`

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
                /*attributes: ["Consola"],
                through: {
                    attributes: [],
                },*/
            },
        });
        console.log(GameDB)
        const Geimer = VideogameAPI.concat(GameDB);
        const array = [];
        if(!Titulo) {
        return res.json(Geimer)
        } else {
            for(j in Geimer) {
                result = Geimer[j].Titulo.toLowerCase().match(Titulo.toLocaleLowerCase());
                if(result) {
                    array.push(Geimer[j]);
                }
                console.log(array)
            }
            res.json(array)
        }
    } catch(error) {
        console.error("No hay nada guevon")
    }
})

router.get('/:id', async function GamesID(req, res) {
    const { id } = req.params;
    console.log(id)
    if(id) {
        if((/^([0-9])*$/.test(id))) {
            try {
                const GTA = await axios.get(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`)
                let obj = {
                    ID: GTA.data.id,
                    Titulo: GTA.data.name,
                    Imagen: GTA.data.background_image,
                    Descripcion: GTA.data.description,
                    Lanzamiento: GTA.data.released,
                    Rating: GTA.data.metacritic,
                    Generos: GTA.data.genres,
                    Consolas: GTA.data.platforms.map((e) => {
                    return e.platform.name
                }),
                };
                return res.json(obj)
            } catch(error) {
                res.status(400).send(`ID ${id} doesnt exists`)
            }
        } else {
            try {
                let query = await Videogame.findByPk(id, {
                    include: {
                        model: Genre
                    }
                });
                res.json(query);
            } catch(error) {
                res.status(400).send(`No hay id ${id} en la DB`)
            }
        }
    }
});

router.post('/', async function createPoke(req, res) {
    const { Titulo, Descripcion, Lanzamiento, Rating, Consola, Imagen, genreId} = req.body;
    try {
    const Val_Game = await Videogame.findOne({
        where: {
            Titulo: Titulo,
        },
    })
    if(!Val_Game) {
        const new_Game = await Videogame.create({
            Titulo: Titulo,
            Descripcion: Descripcion,
            Lanzamiento: Lanzamiento,
            Rating: Rating,
            Velocidad: Velocidad,
            Consola: Consola,
            Imagen: Imagen,
            Creado: true
        });
        const GameID = await Genre.findAll({
           where: {
               id: genreId
           },
        });
        const show_Game = await new_Game.addType(GameID);
        return res.send(show_Game);
    } 
    const GameID = await Genre.findAll({
        where: {
            id: genreId,
        },
    });
    const show_Game = await Val_Game.addType(GameID);
    res.send(show_Game)
   } catch(error) {
        res.status(500).json(error);
    }
})

module.exports = router;