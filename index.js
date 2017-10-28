const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const films = require('./server/routes/films')

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('*', (req, res) => {
    res.status(200).send({
        message: 'Welcome to the dark side!'
    })
})

app.use('/api/films', films)

module.exports = app