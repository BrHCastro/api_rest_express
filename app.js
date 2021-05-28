require('dotenv/config')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var DB = {
    games: [
        {
            id: 23,
            title: 'Call of Duty MW',
            year: 2019,
            price: 60
        },
        {
            id: 24,
            title: 'Grand Theft Auto V',
            year: 2013,
            price: 100
        },
        {
            id: 25,
            title: 'The Last Of Us Part II',
            year: 2020,
            price: 149.90
        }
    ]
}

app.get('/games', (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
})

app.get('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        let id = parseInt(req.params.id);
        let game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }
});

app.post('/game', (req, res) => {
    let {id, title, year, price} = req.body;

    DB.games.push({
        id,
        title,
        year,
        price
    });

    res.sendStatus(200);
});

app.delete('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        let id = parseInt(req.params.id);
        let index = DB.games.findIndex(g => g.id == id);

        if (index == -1) {
            res.sendStatus(404);
        } else {
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }
});

app.put('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        let id = parseInt(req.params.id);
        let game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            
            let {id, title, year, price} = req.body;

            if (title != undefined) {
                game.title = title;
            }

            if (year != undefined) {
                game.year = year;
            }

            if (price != undefined) {
                game.price = price;
            }

            res.sendStatus(200)

        } else {
            res.sendStatus(404);
        }
    }
})




app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${process.env.SERVER_PORT}`)
})

