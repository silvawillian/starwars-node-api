const axios = require('axios')
const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: '../db/star_wars.sqlite'
})

let Films = sequelize.define('Films', {
    title: Sequelize.STRING,
    episode_id: Sequelize.INTEGER,
    opening_crawl: Sequelize.STRING,
    director: Sequelize.STRING,
    producer: Sequelize.STRING,
    release_date: Sequelize.DATE,
    birth_year: Sequelize.STRING,
    created: Sequelize.DATE,
    edited: Sequelize.DATE,
    url: Sequelize.STRING
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

// Films.sync({force: true}).then(() => {
//     fetchDataFromSwapi()
// })

function fetchDataFromSwapi (url) {
    if (!url || url === '') url = 'https://swapi.co/api/films/?page=1'
    axios.get(url).then((data) => {
        data.data.results.map((film) => {
            console.log(film)
            Films.create({
                title: film.title,
                episode_id: film.episode_id,
                opening_crawl: film.opening_crawl,
                director: film.director,
                producer: film.producer,
                release_date: film.release_date,
                created: film.created,
                edited: film.edited,
                url: film.url,
            })
        })

        if (data.data.next) {
            fetchDataFromSwapi(data.data.next)
        }
    })
}

module.exports = Films