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

let Vehicles = sequelize.define('Vehicles', {
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
    vehicle_class: Sequelize.STRING,
    created: Sequelize.DATE,    
    edited: Sequelize.DATE,
    url: Sequelize.STRING
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

Vehicles.sync({force: true}).then(() => {
    fetchDataFromSwapi()
})

function fetchDataFromSwapi (url) {
    if (!url || url === '') url = 'https://swapi.co/api/vehicles/?page=1'
    axios.get(url).then((data) => {
        data.data.results.map((vehicle) => {
            console.log(vehicle)
            Vehicles.create({
                name: vehicle.name,
                model: vehicle.model,
                manufacturer: vehicle.manufacturer,
                cost_in_credits: vehicle.cost_in_credits,
                length: vehicle.length,
                max_atmosphering_speed: vehicle.max_atmosphering_speed,
                crew: vehicle.crew,
                passengers: vehicle.passengers,
                cargo_capacity: vehicle.cargo_capacity,
                consumables: vehicle.consumables,
                created: vehicle.created,
                edited: vehicle.edited,
                url: vehicle.url,
            })
        })

        if (data.data.next) {
            fetchDataFromSwapi(data.data.next)
        }
    })
}