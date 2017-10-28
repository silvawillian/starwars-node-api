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

let People = sequelize.define('People', {
    name: Sequelize.STRING,
    height: Sequelize.STRING,
    mass: Sequelize.STRING,
    hair_color: Sequelize.STRING,
    skin_color: Sequelize.STRING,
    eye_color: Sequelize.STRING,
    birth_year: Sequelize.STRING,
    gender: Sequelize.STRING,
    created: Sequelize.DATE,
    edited: Sequelize.DATE,
    url: Sequelize.STRING
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

People.sync({force: true}).then(() => {
    fetchDataFromSwapi()
})

function fetchDataFromSwapi (url) {
    if (!url || url === '') url = 'https://swapi.co/api/people/?page=1'
    axios.get(url).then((data) => {
        data.data.results.map((person) => {
            console.log(person)
            People.create({
                name: person.name,
                height: person.height,
                mass: person.mass,
                hair_color: person.hair_color,
                skin_color: person.skin_color,
                eye_color: person.eye_color,
                birth_year: person.birth_year,
                gender: person.gender,
                created: person.created,
                edited: person.edited,
                url: person.url,
            })
        })

        if (data.data.next) {
            fetchDataFromSwapi(data.data.next)
        }
    })
}