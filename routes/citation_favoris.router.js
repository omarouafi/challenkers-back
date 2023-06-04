const express = require('express')
const { toggleCitationFavoris } = require('../controllers/citation_favoris.controller')
const router = express.Router()

router.route('/').post(toggleCitationFavoris)

module.exports = router


