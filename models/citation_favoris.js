
const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

const CitationFavoris = db.define('citation_favoris', {
  personnage: DataTypes.STRING,
  episode: DataTypes.STRING,
},{
  tableName: 'citation_favoris'
});

module.exports = CitationFavoris;

