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

let Starships = sequelize.define('Starships', {
    name: Sequelize.STRING,
    model: Sequelize.STRING,
    manufacturer: Sequelize.STRING,
    cost_in_credits: Sequelize.STRING,
    length: Sequelize.STRING,
    max_atmosphering_speed: Sequelize.STRING,
    crew: Sequelize.STRING,
    passengers: Sequelize.STRING,
    cargo_capacity: Sequelize.STRING,    
    consumables: Sequelize.STRING,
    hyperdrive_rating: Sequelize.STRING,
    MGLT: Sequelize.STRING,
    starship_class: Sequelize.STRING,    
    created: Sequelize.DATE,    
    edited: Sequelize.DATE,
    url: Sequelize.STRING
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

Starships.sync({force: true}).then(() => {
    fetchDataFromSwapi()
})

function fetchDataFromSwapi (url) {
    if (!url || url === '') url = 'https://swapi.co/api/starships/?page=1'
    axios.get(url).then((data) => {
        data.data.results.map((starship) => {
            console.log(starship)
            Starships.create({
                name: starship.name,
                model: starship.model,
                manufacturer: starship.manufacturer,
                cost_in_credits: starship.cost_in_credits,
                length: starship.length,
                max_atmosphering_speed: starship.max_atmosphering_speed,
                crew: starship.crew,
                passengers: starship.passengers,
                cargo_capacity: starship.cargo_capacity,
                consumables: starship.consumables,
                hyperdrive_rating: starship.hyperdrive_rating,
                MGLT: starship.MGLT,
                starship_class: starship.starship_class,
                created: starship.created,
                edited: starship.edited,
                url: starship.url,
            })
        })

        if (data.data.next) {
            fetchDataFromSwapi(data.data.next)
        }
    })
}