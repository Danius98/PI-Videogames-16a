const axios = require('axios');
const { Genero } = require ('../db')
const APIKEY = "f648fbbe7d024a9d9b021bbd24cea8b5";
const GENRE = `https://api.rawg.io/api/genres?key=${APIKEY}`

async function DataBase(_req, res) {
    try {
      {
        const All_Api = await axios.get(GENRE);
        const Genre_Model = All_Api.data.results.map((e) => {
          return {
              Genero: e.name,
          };
          });
          Genre_Model.forEach(async (e) => {
              await Genero.findOrCreate({
                  where: {
                      Genero: e.Genero
                  },
              });
          });
       }
       console.log('Joya') 
    }
    catch(error) {
        res.send(error);
  }
}

module.exports = {DataBase}