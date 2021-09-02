const { DataTypes } = require('sequelize');
const { stringify } = require('uuid');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    ID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    Titulo: {type: DataTypes.STRING, allowNull: false},
    Descripcion: {type: DataTypes.TEXT, allowNull: false},
    Lanzamiento: {type: DataTypes.STRING},
    Rating: {type: DataTypes.DECIMAL(10, 2), allowNull: true, get() {
      return parseFloat(this.getDataValue('Rating'))
    }},
    /*Consola: {type: DataTypes.STRING, get function() { return JSON.parse(this.getDataValue('Consola'));},
  set: function(val){ return this.setDataValue('Consola', JSON.stringify(val));}},*/
    Consolas: {type: DataTypes.ARRAY(DataTypes.TEXT)},
    Imagen: {type: DataTypes.TEXT},
    Creado: {type: DataTypes.BOOLEAN, defaultvalue: false}
  },
  { timestamps: false },
  );
};
