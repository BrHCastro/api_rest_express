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

app.get('/', () => {
    
})




app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta: ${process.env.SERVER_PORT}`)
})

