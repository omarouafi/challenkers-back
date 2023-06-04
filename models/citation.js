const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

const Citation = db.define('citation', {
  citation: DataTypes.TEXT,
  auteur: DataTypes.STRING,
  acteur: DataTypes.STRING,
  personnage: DataTypes.STRING,
  saison: DataTypes.STRING,
  episode: DataTypes.STRING,
},{
  tableName: 'citation'
});

module.exports = Citation;