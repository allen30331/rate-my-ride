//This file is used to check if 200 status code and html is sent when 
//page is requested. 

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const {app, runServer, closeServer} = require('../server');




describe('GET endpoint', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  })


  describe('access root folder', function() {
  	it('should return 200 status code and html', function() {
  	let res;
	return chai.request(app)
		.get('/')
		.then(function(_res) {
			res = _res;
			res.should.have.status(200);
			res.should.be.html;
  	});
		});	
  });	

  describe('access add driver page', function() {
    it('should return 200 status code and html', function() {
    let res;
  return chai.request(app)
    .get('/add-driver.html')
    .then(function(_res) {
      res = _res;
      res.should.have.status(200);
      res.should.be.html;
    });
    }); 
  });	

   describe('access dashboard page', function() {
    it('should return 200 status code and html', function() {
    let res;
  return chai.request(app)
    .get('/dashboard.html')
    .then(function(_res) {
      res = _res;
      res.should.have.status(200);
      res.should.be.html;
    });
    }); 
  });

   describe('access log in page', function() {
    it('should return 200 status code and html', function() {
    let res;
  return chai.request(app)
    .get('/log-in.html')
    .then(function(_res) {
      res = _res;
      res.should.have.status(200);
      res.should.be.html;
    });
    }); 
  });

   describe('access rate driver page', function() {
    it('should return 200 status code and html', function() {
    let res;
  return chai.request(app)
    .get('/rate-driver.html')
    .then(function(_res) {
      res = _res;
      res.should.have.status(200);
      res.should.be.html;
    });
    }); 
  });

    describe('access sign up page', function() {
    it('should return 200 status code and html', function() {
    let res;
  return chai.request(app)
    .get('./sign-up.html')
    .then(function(_res) {
      res = _res;
      res.should.have.status(200);
      res.should.be.html;
    });
    }); 
  });
});

