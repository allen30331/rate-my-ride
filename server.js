const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const {DATABASE_URL, PORT} = require('./config');
const {Driver} = require('./models');

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

//Static endpoints begin//
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
  res.sendFile(__dirname + '/public/sign-up.html');
});
//Static endpoints end//


app.get('/driver', (req, res) => {
 // Driver.create({driverName: "Victor",
 //  company: "thinkful",
 //  tagNumber: 1234,
 //  city: "Miami",
 //  driverRating: 5,
 //  tags:  "Good",
 //  reviews: [{
 //    rating: 5,
 //    tag: "NIce",
 //    review: "Good job." 
 //  }]}, (err, driver) => {
 //  	console.log(driver, err);
 //  });
 Driver
    .find({}, (err, drivers) => {
    	console.log(drivers);	
    	res.json(drivers.map(driver => driver.apiRepr()));
    })
    .exec()
    .then(drivers => {
    	console.log(drivers)
    res.json(drivers.map(driver => driver.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
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



if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};

