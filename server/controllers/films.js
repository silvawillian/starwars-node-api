const Films = require('../models/films')

module.exports = {
    get (req, res, next) {
        Films.findAll().then((films) => {
            res.status(200).send(req.params.id)
        })
    },
    getAll (req, res, next) {
        Films.findAll().then((films) => {
            res.status(200).send(films)
        })
    }
}
