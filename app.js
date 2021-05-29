require('dotenv/config')
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.KEY_API;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MiddleWere---------------------------------------------------------------------------------------------
function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    
    if (authToken !== undefined) {

        const bearer = authToken.split(' ');
        let token = bearer[1];

        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.status(401);
                res.json({err: err});
            } else {

                req.token = token;
                req.loggedUder = {
                    id: data.id,
                    email: data.email
                }
                next();
            }
        });

    } else {
        res.status(401);
        res.json({err: 'Token inválido!'})
    }
}

//Database-----------------------------------------------------------------------------------------------
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

const User = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Routers-------------------------------------------------------------------------------------------------
app.get('/games', auth, (req, res) => {
    Game.findAll().then(games => {
        res.statusCode = 200;
        res.json(games);
    }).catch(err => {
        res.sendStatus(417);
    });
});

app.get('/game/:id', auth, (req, res) => {
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

app.post('/game', auth, (req, res) => {
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

app.delete('/game/:id', auth, (req, res) => {
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

app.put('/game/:id', auth, (req, res) => {
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
});

app.post('/user', (req, res) => {
    let {name, email, password} = req.body;

    User.create({
        name: name,
        email: email,
        password: password
    }).then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(417);
    })

});

app.post('/auth', (req, res) => {
    let {email, password} = req.body;

    if (email != undefined) {
        if (password != undefined) {

            User.findOne({
                where: {email:email, password:password}
            }).then(user => {

                if (user) {

                    jwt.sign({id:user.id,email: user.email}, jwtSecret,{expiresIn:'48h'}, (err, token) => {
                        if(err) {
                            res.status(400);
                            res.json({err: err})
                        } else {
                            res.status(200);
                            res.json({ok: "Usuário autenticado!", token: token});
                        }
                    })
                } else {
                    res.sendStatus(404);
                }

            }).catch(err => {
                res.json({err: err})
            });

        } else {
            res.status(400);
            res.json({err: "Senha enviada é inválida!"})
        }
    } else {
        res.status(400);
        res.json({err: "E-mail enviado é inválido!"})
    }
});




app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${process.env.SERVER_PORT}`)
})

