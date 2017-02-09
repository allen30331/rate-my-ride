//This public folder router file is used to send any resources from the public folder. 



const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {RateDriver} = require('./models');

const app = express();


router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/add-driver', (req, res) => {
  res.sendFile(__dirname + '/public/add-driver.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});

app.get('/log-in', (req, res) => {
  res.sendFile(__dirname + '/public/log-in.html');
});

app.get('/rate-driver', (req, res) => {
  res.sendFile(__dirname + '/public/log-in.html');
});

app.get('/sign-up', (req, res) => {
  res.sendFile(__dirname + '/public/log-in.html');
});

module.exports = router;