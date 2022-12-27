const axios = require('axios');
const { Genero } = require ('../db')
const APIKEY = "f648fbbe7d024a9d9b021bbd24cea8b5";
const GENRE = `https://api.rawg.io/api/genres?key=${APIKEY}`


//https://api.rawg.io/api/genres?key=f648fbbe7d024a9d9b021bbd24cea8b5

async function DataBase(_req, res) {
    try {
      {
        const All_Api = await axios.get(GENRE);
        //console.log(All_Api);
        const Genre_Model = All_Api.data.results.map((e) => {
          return {
              Genero: e.name,
          };
          });
          //console.log(Genre_Model)
          Genre_Model.forEach(async (e) => {
              await Genero.findOrCreate({
                  where: {
                      Genero: e.Genero
                  },
              });
          });
          //console.log(Genre_Model)
       }
       console.log('Joya') 
    }
    catch(error) {
        res.send(error);
  }
}

module.exports = {DataBase}