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
            ano: 2019,
            preco: 60
        },
        {
            id: 24,
            title: 'Grand Theft Auto V',
            ano: 2013,
            preco: 100
        },
        {
            id: 25,
            title: 'The Last Of Us Part II',
            ano: 2020,
            preco: 149.90
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




app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta: ${process.env.SERVER_PORT}`)
})

