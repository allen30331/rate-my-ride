const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const path = require('path');

const driversRouter = require('./driversRouter');

const {DATABASE_URL, PORT} = require('./config');
const {Driver} = require('./models');

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;


//app.use(express.static(path.join(__dirname, 'public')));
    

//Static endpoints begin//
app.get('/add-driver', (req, res) => {
    res.sendFile(__dirname + '/public/add-driver.html');
});

//Static endpoints end//



app.use('/drivers', driversRouter);


app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});


let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
    	console.log(DATABASE_URL);
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}


// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};

