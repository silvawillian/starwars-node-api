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

let Species = sequelize.define('Species', {
    name: Sequelize.STRING,
    classification: Sequelize.STRING,
    designation: Sequelize.STRING,
    average_height: Sequelize.STRING,
    skin_colors: Sequelize.STRING,
    hair_colors: Sequelize.STRING,
    eye_colors: Sequelize.STRING,
    average_lifespan: Sequelize.STRING,
    homeworld: Sequelize.STRING,    
    language: Sequelize.STRING,
    created: Sequelize.DATE,    
    edited: Sequelize.DATE,
    url: Sequelize.STRING
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

Species.sync({force: true}).then(() => {
    fetchDataFromSwapi()
})

function fetchDataFromSwapi (url) {
    if (!url || url === '') url = 'https://swapi.co/api/species/?page=1'
    axios.get(url).then((data) => {
        data.data.results.map((species) => {
            console.log(species)
            Species.create({
                name: species.name,
                classification: species.classification,
                designation: species.designation,
                average_height: species.average_height,
                skin_colors: species.skin_colors,
                hair_colors: species.hair_colors,
                eye_colors: species.eye_colors,
                average_lifespan: species.average_lifespan,
                homeworld: species.homeworld,
                language: species.language,
                created: species.created,
                edited: species.edited,                
                url: species.url
            })
        })

        if (data.data.next) {
            fetchDataFromSwapi(data.data.next)
        }
    })
}