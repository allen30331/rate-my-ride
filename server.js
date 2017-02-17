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

//app.use(express.static(path.join(__dirname, 'public')));
    

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



//Get driver by Tag Number
app.get('/drivers/:tagNumber/tagNumber', (req, res) => {
  
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

// /api/model/:id/action
// /api/model/task/action
//if you just want to get data, api/model will give you all the data pertaining 
//to that model. 
//api/drivers/:id/id
//api/drivers/:tagname/tagname


//Get driver by Id
app.get('/drivers/:id', (req, res) => {
 
    Driver
    .findById(req.params.id)
    .exec()
    .then(drivers => res.json(drivers.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});


//Create driver
app.post('/drivers', (req, res) => {

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


//Update review
app.put('/drivers/:id', (req, res) => {

  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }

  const toUpdate = {};
  const updateableFields = ['tagNumber'];

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



//Delete review 
app.delete('/review/:id', (req, res) => {
  Driver
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});




//Add driver review
app.post('/drivers/:id/reviews', (req, res) => {

  const requiredFields = ['driverRating', 'description', 'comment'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      res.status(400).json(
        {error: `Missing "${field}" in request body`});
    }});

      
  Driver
    .findById(req.params.id)
    .exec()
    .then(function(driver) {
      driver.reviews.push(req.body)
      driver.save()
      res.json(driver.apiRepr())
      res.status(204).end()
    })  
    .catch(err => res.status(500).json({message: 'Internal server error', error: err.message}));
});




//Delete review 
app.delete('/review/:id', (req, res) => {
  Driver
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.status(204).end())
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

