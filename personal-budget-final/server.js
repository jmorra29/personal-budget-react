const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const bodyParser = require('body-parser');
const path = require('path');
const user = require('./accounts.json');
const fs = require('fs');
const json = require('C:\\dev\\jwt\\budget.json');
const mongoose = require("mongoose")
const namesModel = require('C:\\dev\\jwt\\budget_schema')

let url = 'mongodb://localhost:27017/budget_values';

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', "Content-type,Authorization");
    next();
});

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = 3000;

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

const secretKey = makeid(5);
const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256']
});

let users = [
    {
        id: 1,
        username: 'fabio',
        password: '123'
    },
    {
        id: '2',
        username: 'nolasco',
        password: '456'
    }
];

app.post('/api/login', (req, res) => {
    const {username, password} = req.body;

    for (let user of users){
        if (username == user.username && password == user.password){
            let token = jwt.sign({id: user.id, username: user.username }, secretKey, {expiresIn: '7d' });
            res.json({
                success: true,
                err: null,
                token
            });
            break;
        }
        else {
            res.status(401).json({
                success: false,
                token: null,
                err: 'Username or Password is incorrect'
            });
        }
    }
});

app.get('/api/dashboard', jwtMW, (req, res) => {
    console.log(req);
    res.json({
        success: true
    });
});
app.get('/api/logout', jwtMW, (req, res) => {
    console.log(req);
    res.json({
        success: true
    });
});
app.get('/api/about', jwtMW, (req, res) => {
    console.log(req);
    res.json({
        success: true
    });
});
app.get('/api/charts', jwtMW, (req, res) => {
    console.log(req);
    res.json({
        success: true
    });
});


app.use(function (err, req, res, next){
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            success: false,
            officialError: err,
            err: 'Username or Password incorrect 2'
        });
    }
    else {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true })
        .then(()=>{
            namesModel.find({})
                     .then((data) => {
                         res.send(data);
                         mongoose.connection.close()
                     })
                     .catch((connectionError)=>{
                         console.log(connectionError)
                     })
        })

        
});

