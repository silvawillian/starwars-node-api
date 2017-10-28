const express = require('express')
const router = express.Router()
const filmsController = require('../controllers/films')

router.get('/', filmsController.getAll)
router.get('/:id', filmsController.get)

module.exports = router;
