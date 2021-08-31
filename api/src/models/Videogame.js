const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    ID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    Titulo: {type: DataTypes.STRING, allowNull: false},
    Descripcion: {type: DataTypes.TEXT, allowNull: false},
    Lanzamiento: {type: DataTypes.STRING},
    Rating: {type: DataTypes.STRING},
    Consola: {type: DataTypes.STRING},
    Imagen: {type: DataTypes.TEXT},
    Creado: {type: DataTypes.BOOLEAN, defaultvalue: false}
  },
  { timestamps: false },
  );
};
