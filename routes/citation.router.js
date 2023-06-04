const express = require('express')
const { getCitations, createCitation, getCitationById, updateCitation, deleteCitation, getCitationFromApi, getRandomCitation } = require('../controllers/citation.controller')
const router = express.Router()

router.route('/').get(getCitations).post(createCitation)
router.route('/random').get(getRandomCitation)
router.route('/kaamelott').get(getCitationFromApi)
router.route('/:id').get(getCitationById).put(updateCitation).delete(deleteCitation)


module.exports = router


