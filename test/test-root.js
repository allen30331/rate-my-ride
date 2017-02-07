const chai = require('chai');
const should = require('chai').should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const {app, runServer, closeServer} = require('../server');


describe('access folder', function() {

  // before(function() {
  //   return runServer();
  // });

  afterEach(function() {
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
});

