var {Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('./Videogame');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("Genero",
      { Genero: { type: DataTypes.STRING, allowNull: false },
      },
      { timestamps: false }
    );
  };