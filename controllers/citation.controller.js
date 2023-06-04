const axios = require('axios');
const Citation = require('../models/citation')
const CitationFavoris = require('../models/citation_favoris');
const { Op } = require('sequelize');

const citation_favourite = async (citation) => {
  try{
    const exists = await CitationFavoris.findOne({
      where: {
        personnage: citation.personnage,
        episode: citation.episode
      }
    })
    citation.favoris = !!exists
    return citation
  }catch(err){
    return res.status(500).json({err})
  }
}

exports.getCitations = async (req, res) => {
    try{
        const citation = req.query.citation || ''
        const citations = await Citation.findAll({
          where: {
            citation: {
              [Op.like]: '%' + citation + '%',
            },
          },
        });
        return res.status(200).json({
            citations
        })
    }catch(err){    
        return res.status(500).json({err})
    }
}

exports.createCitation = async (req, res) => {
    try{
        delete req.body.id;
        delete req.body.createdAt;
        delete req.body.updatedAt;

        const citation = await Citation.create(req.body);
        return res.status(201).json({
            citation
        })
    }catch(err){
        return res.status(500).json({err})
    }
}

exports.getCitationById = async (req, res) => {
    try{
        const citation = await Citation.findByPk(req.params.id);
        return res.status(200).json({
            citation
        })
    }catch(err){
        return res.status(500).json({err})
    }
}

// get random citation
exports.getRandomCitation = async (req, res) => {
    try{
        let citation = await Citation.findOne({
            order: [
                [Citation.sequelize.fn('RAND')]
            ]
        });

        citation = await citation_favourite({...citation.dataValues})

        return res.status(200).json({
            citation
        })
    }catch(err){
        return res.status(500).json({err})  
    }
}


exports.updateCitation = async (req, res) => {
    try{
        delete req.body.id;
        delete req.body.createdAt;
        delete req.body.updatedAt;
        const citation = await Citation.findByPk(req.params.id);
        await citation.update(req.body);
        return res.status(200).json({
            citation
        })
    }catch(err){
        return res.status(500).json({err})
    }
}

exports.deleteCitation = async (req, res) => {
    try{
        const citation = await Citation.findByPk(req.params.id);
        await citation.destroy();
        return res.status(200).json({
            msg: "Citation deleted"
        })
    }catch(err){
        return res.status(500).json({err})
    }
}


//get citation from Kaamelott api

exports.getCitationFromApi = async (req, res) => {
    try{
      let response = await axios.get('https://kaamelott.chaudie.re/api/random');

      if (!response.data.citation){
          return response.status(404).json({
              msg: "Citation not found"
          })
      }

      let citation = response.data.citation
      citation = {citation: citation.citation, auteur: citation.infos.auteur, acteur: citation.infos.acteur, personnage: citation.infos.personnage, saison: citation.infos.saison, episode: citation.infos.episode}
      citation = await citation_favourite(citation)
      return res.status(200).json({
          citation
      })
    }catch(err){
        return res.status(500).json({err})
    }
}

