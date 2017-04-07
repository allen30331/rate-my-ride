const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Driver} = require('./models');






//Get all drivers
router.get('/', (req, res) => {
  
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
router.get('/:tagNumber/tagNumber', (req, res) => {
  
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
router.get('/:id', (req, res) => {
 
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
router.post('/', (req, res) => {

  Driver
    .create({
      driverName: req.body.driverName.toUpperCase(),
      company: req.body.company,
      tagNumber: req.body.tagNumber.toUpperCase().replace(/\s+/g, ''),
      city: req.body.city,
      descriptionSummary: req.body.reviews.description,
      reviews: req.body.reviews
    })
    .then(driverEntry => res.status(201).json(driverEntry.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});




//Add driver review to existing driver
router.post('/:id/reviews', (req, res) => {

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




module.exports = router;