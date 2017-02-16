const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const path = require('path');

const {DATABASE_URL, PORT} = require('./config');
const {Driver} = require('./models');

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, 'public')));


//Get driver by Tag Number
app.get('/driver-tag/:tagNumber', (req, res) => {
  
  const tagNumber = req.params.tagNumber;
 
  Driver
    .findOne({tagNumber})
    .exec()
    .then(drivers => res.json(drivers.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});



//Get driver by Id
app.get('/driver-id/:id', (req, res) => {
  console.log(req.params.id);
  Driver
    .findById(req.params.id)
    .exec()
    .then(drivers => res.json(drivers.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});



//Get all drivers
app.get('/drivers', (req, res) => {
  
  Driver
    .find()
    .exec()
    .then(drivers => { 
      res.json(drivers.map(driver => driver.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});



//Add driver
app.post('/new-driver', (req, res) => {

  const requiredFields = ['driverName', 'company', 'tagNumber', 'city'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      res.status(400).json(
        {error: `Missing "${field}" in request body`});
    }});

  Driver
    .create({
      driverName: req.body.driverName,
      company: req.body.company,
      tagNumber: req.body.tagNumber.toUpperCase().replace(/\s+/g, ''),
      city: req.body.city,
      averageDriverRating: req.body.reviews.driverRating,
      descriptionSummary: req.body.reviews.description,
      reviews: req.body.reviews
      //driverRating: req.body.driverRating,
      //created: req.body.created
    })
    .then(driverEntry => res.status(201).json(driverEntry.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});


//Update
app.put('/driver/:id', (req, res) => {

  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }

  const toUpdate = {};
  const updateableFields = ['tagNumber', 'driverRating', 'description', 'comment'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Driver
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .exec()
    .then(driver => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
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

