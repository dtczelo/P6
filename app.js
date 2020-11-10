const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const saucesRoutes = require('./routes/sauces');
const usersRoutes = require('./routes/users');
const path = require('path');
const fs = require('fs');
const app = express();

mongoose.connect('mongodb+srv://Pekocko:Pekocko2020@p6.auttg.mongodb.net/<dbname>?retryWrites=true&w=majority',
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Referer, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', usersRoutes);

module.exports = app;