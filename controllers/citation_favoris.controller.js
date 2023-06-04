const CitationFavoris = require('../models/citation_favoris');

// toggle a favorite citation
exports.toggleCitationFavoris = async (req, res) => {
    try{
        delete req.body.id;
        delete req.body.createdAt;
        delete req.body.updatedAt;

        const exists = await CitationFavoris.findOne({
            where: {
                personnage: req.body.personnage,
                episode: req.body.episode
            }
        })  

        if(exists){
            await exists.destroy();
            return res.status(200).json({
                msg: "Citation deleted from favorites"
            })
        }

        const citationFavoris = await CitationFavoris.create(req.body);
        return res.status(201).json({
            citationFavoris
        })
    }catch(err){    
        return res.status(500).json({err})
    }
}

