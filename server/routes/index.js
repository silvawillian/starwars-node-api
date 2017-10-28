const express = require('express')
const app = express()
const films = require('../controllers/films')

app.route('/films', films)
