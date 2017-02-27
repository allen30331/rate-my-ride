// //This file is used to check if 200 status code and html is sent when 
// //page is requested. 

// const chai = require('chai');
// const should = chai.should();
// const chaiHttp = require('chai-http');
// const faker = require('faker');
// chai.use(chaiHttp);
// const mongoose = require('mongoose');

// const {app, runServer, closeServer} = require('../server');

// const {Driver} = require('../models');
// const {User} = require('../users/models');


// function seedDriverData() {
//   console.info('seeding driver data');
//   const seedData = [];

//   for (let i=1; i<=10; i++) {
//     seedData.push(generateDriverData());
//   }
//   // this will return a promise
//   return Driver.insertMany(seedData);
// }


// function generateDriverCompany() {
//   let type = ['Uber', 'Lyft'];
//   return type[Math.floor(Math.random() * type.length)];
// }

// function generateDriverTagNumber() {
//   let type = ['ABC123', 'DEF456', 'AZA143', 'BHS735'];
//   return type[Math.floor(Math.random() * type.length)];
// }

// function generateDriverDescription() {
//   let type = ['Good', 'Bad', 'Creepy', 'Nuetral'];
//   return type[Math.floor(Math.random() * type.length)];
// }

// function generateDriverRating() {
//   return Math.floor((Math.random() * 5) + 1);
// }

// // generate an object represnting a driver.
// // can be used to generate seed data for db
// // or request.body data
// function generateDriverData() {
//   return {
//     driverName: faker.name.firstName(),
//     company: generateDriverCompany(),
//     tagNumber: generateDriverTagNumber(),
//     city: faker.address.city(),
//     reviews: [
//           {
//             driverRating: generateDriverRating(),
//             description: generateDriverDescription(),
//             comment: faker.lorem.sentence()
//           }
//     ]
//   }
// }

// function generateUser() {
//   return {
//     username: faker.random.word(),
//     password: faker.random.alphaNumeric()
//   }
// }


// // this function deletes the entire database.
// // we'll call it in an `afterEach` block below
// // to ensure  data from one test does not stick
// // around for next one
// //
// // we have this function return a promise because
// // mongoose operations are asynchronous. we can either
// // call a `done` callback or return a promise in our
// // `before`, `beforeEach` etc. functions.
// // https://mochajs.org/#asynchronous-hooks
// function tearDownDb() {
//   return new Promise((resolve, reject) => {
//     console.warn('Deleting database');
//     mongoose.connection.dropDatabase()
//       .then(result => resolve(result))
//       .catch(err => reject(err));
//   });
// }







// //Tests static endpoints begin
// describe('GET static pages', function() {


//   before(function() {
//     return runServer();
//   });

//   beforeEach(function() {
//     return seedDriverData();
//   });

//   afterEach(function() {
//     return tearDownDb();
//   });

//   after(function() {
//     return closeServer();
//   });







//   // before(function() {
//   //   return runServer();
//   // });

//   // after(function() {
//   //   return closeServer();
//   // })


//   describe('access root folder', function() {
//   	it('should return 200 status code and html', function() {
//   	let res;
// 	return chai.request(app)
// 		.get('/')
// 		.then(function(_res) {
// 			res = _res;
// 			res.should.have.status(200);
// 			res.should.be.html;
//   	});
// 		});	
//   });	

//   describe('access add driver page', function() {
//     it('should return 200 status code and html', function() {
//     let res;
//   return chai.request(app)
//     .get('/add-driver')
//     .then(function(_res) {
//       res = _res;
//       res.should.have.status(200);
//       res.should.be.html;
//     });
//     }); 
//   });	

// });
// //Test static endpoints end




// //Driver tests begin
// describe('Test Driver routes', function() {

//   it('should create a driver', function () {
//     const newDriver = generateDriverData();
//     return chai.request(app)
//     .post('/drivers')
//     .send(newDriver)
//     .then(function(res) {
//       res.should.have.status(201);
//       res.should.be.json;
//       res.body.should.be.a('object');
//       res.body.should.include.keys('id', 'driverName', 'company', 'tagNumber', 'city', 'averageDriverRating', 'descriptionSummary', 'reviews');   
//       res.body.reviews.forEach(function(review) {
//         review.should.include.keys('_id', 'driverRating', 'description', 'comment', 'created');
//       });
//     });
//   });


//   it('should get all drivers', function () {
//     let res;
//     return chai.request(app)
//     .get('/drivers')
//     .then(function(_res) {
//       res = _res;
//       res.should.have.status(200);
//       res.should.be.json;
//       res.should.be.an.array;
//       res.body.forEach(function(driver) {
//         driver.should.be.a('object');
//         driver.should.include.keys( 'id', 'driverName', 'company', 'tagNumber', 'city');
//           });
//     });
//   })  


// });





// //User tests begin
// describe('Test user routes', function() {

//   it("should create a new user", function() {
//     const newUser = generateUser();
//     return chai.request(app)
//     .post('/users')
//     .send(newUser)
//     .then(function(res) {
//       res.should.have.status(201);
//       res.should.be.json;
//       res.body.should.be.a('object');
//       res.body.should.include.keys('username');
//     });
//   });
  


//   it("should get all users", function(){
//     let res;
//     return chai.request(app)
//     .get('/users')
//     .then(function(_res) {
//       res = _res;
//       res.should.have.status(200);
//       res.should.be.json;
//       res.should.be.an.array;
//     });
//   });



//   // it("logs in user", function() {

//   // });

// });
// //User tests end
