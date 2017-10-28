const axios = require('axios')
const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: '../db/star_wars.sqlite'
})

let Planets = sequelize.define('Planets', {
    name: Sequelize.STRING,
    rotation_period: Sequelize.INTEGER,
    orbital_period: Sequelize.STRING,
    diameter: Sequelize.STRING,
    climate: Sequelize.STRING,
    gravity: Sequelize.DATE,
    terrain: Sequelize.STRING,
    surface_water: Sequelize.STRING,
    population: Sequelize.STRING,    
    created: Sequelize.DATE,
    edited: Sequelize.DATE,
    url: Sequelize.STRING
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

Planets.sync({force: true}).then(() => {
    fetchDataFromSwapi()
})

function fetchDataFromSwapi (url) {
    if (!url || url === '') url = 'https://swapi.co/api/planets/?page=1'
    axios.get(url).then((data) => {
        data.data.results.map((planet) => {
            console.log(planet)
            Planets.create({
                name: planet.name,
                rotation_period: planet.rotation_period,
                orbital_period: planet.orbital_period,
                diameter: planet.diameter,
                climate: planet.climate,
                gravity: planet.gravity,
                terrain: planet.terrain,
                surface_water: planet.surface_water,
                population: planet.population,
                created: planet.created,
                edited: planet.edited,
                url: planet.url
            })
        })

        if (data.data.next) {
            fetchDataFromSwapi(data.data.next)
        }
    })
}