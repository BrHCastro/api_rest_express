require('dotenv/config')
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const connection = new Sequelize(process.env.DATABASE,process.env.USER_NAME,process.env.PASS, {
    host: process.env.HOST,
    dialect: 'mysql',
    timezone: "-03:00"
});

const Game = connection.define('games', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

app.get('/games', (req, res) => {
    Game.findAll().then(games => {
        res.statusCode = 200;
        res.json(games);
    }).catch(err => {
        res.sendStatus(417);
    });
});

app.get('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        let id = parseInt(req.params.id);

        Game.findOne({
            where: {id: id}
        }).then((game) => {

            if (game != undefined) {
                res.statusCode = 200;
                res.json(game);
            } else {
                res.sendStatus(404);
            }

        }).catch((err) => {
            res.sendStatus(417);
        })
    }
});

app.post('/game', (req, res) => {
    let {title, year, price} = req.body;

    Game.create({
        title: title,
        year: year,
        price: price
    }).then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(417);
    })

});

app.delete('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        let id = parseInt(req.params.id);

        Game.destroy({
            where: { id: id}
        }).then((index) => {

            if (index < 1) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
                console.log(index)
            }

        }).catch((err) => {
            res.sendStatus(417);
        });
    }
});

app.put('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        let id = parseInt(req.params.id);
        let {title, year, price} = req.body;
        
        Game.update({
            title: title,
            year: year,
            price: price
        },{
            where: {id: id}
        }).then(() => {
            res.sendStatus(200)
        }).catch(() => {
            res.sendStatus(404);
        });
    }
})




app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${process.env.SERVER_PORT}`)
})

