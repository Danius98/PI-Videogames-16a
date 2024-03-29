const axios = require('axios');
const { Router } = require('express');
const { Videogame, Genero } = require('../db');
const router = Router();
const APIKEY = "f648fbbe7d024a9d9b021bbd24cea8b5"
const GAMES = `https://api.rawg.io/api/games?key=${APIKEY}`
//const GAMESID = `https://api.rawg.io/api/games/${id}?key=${APIKEY}`
//const TEST = `https://api.rawg.io/api/games/${1}?key=${APIKEY}`
//https://api.rawg.io/api/games?key=f648fbbe7d024a9d9b021bbd24cea8b5


router.get('/', async function AllGames(req, res, next) {
    let VideogameAPI = [];
    const pages = [GAMES]
    //console.ilog(pages)
    try {
        const { Titulo } = req.query
        for(let i = 0; i < 5; i++) {
            /*    
    fetch(game + `&page=${contador}`).then(res => res.json()).then(json => videogames.push(json.results))*/
        const response = await axios.get(`${pages[i]}`)
        console.log(response)
        pages.push(response.data.next)
        //console.log("cualquier ocsa");
        //fetch(api).then(res => res.json()).then(data => data.next)
        //console.log(response);
        const Game = response.data.results.map((e) => {
            let All_games = {
                ID: e.id,
                Titulo: e.name,
                Imagen: e.background_image,
                Lanzamiento: e.released,
                Rating: e.rating,
                Generos: e.genres.map((e) => {
                    return {
                    Genero: e.name,
                  };
              }),
                Consolas: e.platforms.map((e) => {
                    return e.platform.name
                }),
                Creado: false,
            };
            return All_games
        })
        VideogameAPI = VideogameAPI.concat(Game)
        //console.log(VideogameAPI)
        }
        const GameDB = await Videogame.findAll({
            include: {
                model: Genero,
                attributes: ["Genero"],
                through: {
                    attributes: [],
                },
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

/*router.get('/Hero', async function(_req, res){
        let id = 1
        const Hero = [`https://api.rawg.io/api/games/${id}?key=${APIKEY}`]
        console.log(Hero)
        try {
            if(id < 4) {
            for(let i = 0; i < 3; i++) {
                const response = await axios.get(`${Hero[i]}`)
                Hero.push(response)
                console.log(response)
            }
        }
            res.json("Cosa")
        } catch(error) {
        console.error("Nothing")
        }
})*/

/*router.get('/Consolas', async function(_req, res) {
    try {
        const GameApi = await axios.get(GAMES);
        const result = GameApi.data.results;
        const response = [];
        result.forEach((e) => {
            e.platforms.forEach((p) => {
                const name = p.platform.name
                if(!response.includes(name)){
                    response.push(name)
                    if(!response.includes('PlayStation 2')){
                        response.push('PlayStation 2')
                    }
                }
            })
        })
        res.send(response)
    } catch(error) {
        res.send(error)
    }
})*/

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
                    Rating: GTA.data.rating,
                    Generos: GTA.data.genres.map((e) => {
                        return {
                            Genero: e.name
                        }
                    }),
                    Consolas: GTA.data.platforms.map((e) => {
                    return e.platform.name
                }),
                    Creado: false,
                };
                return res.json(obj)
            } catch(error) {
                res.status(400).send(`ID ${id} doesnt exists`)
            }
        } else {
            try {
                let query = await Videogame.findByPk(id, {
                    include: {
                        model: Genero,
                        attributes: ["Genero"],
                        through: {
                        attributes: [],
                     },
                    }
                });
                res.json(query);
            } catch(error) {
                res.status(400).send(`No hay id ${id} en la DB`)
            }
        }
    }
});

router.post('/', async function createGame (req, res) {
    const { Titulo, Descripcion, Lanzamiento, Rating, Consolas, Imagen, GeneroId} = req.body;
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
            Consolas: Consolas,
            Imagen: Imagen,
            Creado: true
        });
        const GameID = await Genero.findAll({
           where: {
               id: GeneroId,
           },
        });
        const show_Game = await new_Game.addGenero(GameID);
        return res.send(show_Game);
    } 
    const GameID = await Genero.findAll({
        where: {
            id: GeneroId,
        },
    });
    const show_Game = await Val_Game.addGenero(GameID);
    res.send(show_Game)
   } catch(error) {
        res.status(500).json(error);
    }
})

module.exports = router;

/*
function xbox(){
       let response = fetch(game).then(res => res.json()).then(json => response = json)
        return response
    }
contador = 2;
next = respose //pagina que le sigue
while(contador <= 5){
    
    fetch(game + `&page=${contador}`).then(res => res.json()).then(json => videogames.push(json.results))*/

/*function xbox(){
    let api = "https://api.rawg.io/api/games?key=f648fbbe7d024a9d9b021bbd24cea8b5"
    let videogames = []
    let pages = [api]
       for(let i = 2; i <= 5; i++){
    let response = fetch(api + `&page=${i}`).then(res => res.json()).then(json => pages.push(json))
}
    let video = response.json.results.map((e) => {
        let All_games = {
            ID: e.id
        }
        return All_games
    })
    videogames = videogames.concat(video)
    return videogames
    } */