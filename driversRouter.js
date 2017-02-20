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
      descriptionSummary: req.body.reviews.description,
      reviews: req.body.reviews
    })
    .then(driverEntry => res.status(201).json(driverEntry.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});




//Update driver information
router.put('/:id', (req, res) => {

  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }

  const toUpdate = {};
  const updateableFields = ['driverName', 'company', 'tagNumber', 'city'];

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


//Update review
router.put('/:id/review', (req, res) => {

	let driverRating = req.body.driverRating;
	let description = req.body.description;
	let comment = req.body.comment; 

	let indexOfReview = 0; 

	Driver
    .find()
    .exec()
    .then(function(listOfDrivers) {
      listOfDrivers.forEach(function(driver) {
         driver.reviews.forEach(function(review) {
           if(review._id.toString() !== req.params.id) {
             indexOfReview++;
          }
           else{
           	driver.reviews[indexOfReview].driverRating = driverRating;
            driver.reviews[indexOfReview].description = description;
            driver.reviews[indexOfReview].comment = comment;
            driver.save();
          }
          
          indexOfReview = 0;
         })
      })
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));	
});



//Add driver review
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


//Delete review 
router.delete('/:id/review', (req, res) => {
  
let indexOfReview = 0;

  Driver
    .find()
    .exec()
    .then(function(listOfDrivers) {
      listOfDrivers.forEach(function(driver) {
         driver.reviews.forEach(function(review) {
           if(review._id.toString() !== req.params.id) {
             indexOfReview++;
          }
          else{
            driver.reviews.splice(indexOfReview,1);
            driver.save();
          }

          indexOfReview = 0;
         })
      })
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});





//Delete driver 
router.delete('/:id/delete', (req, res) => {
  Driver
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});


// Delte review alternative way, getting error
// app.delete('/drivers/:id/reviews/:review_id', (req, res) => {
 
//   let driverId = req.params.id;

//   let reviewId = req.params.review_id;

//   Driver
//     .find({_id: driverId}, (err, driver) => {
//       driver.reviews.id(reviewId).remove();
//       driver.save(err => {res.status(200).json({message: "The review was deleted"})});
//     })

// });









module.exports = router;