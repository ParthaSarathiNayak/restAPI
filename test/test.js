//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Student = require('../models/db');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Students', () => {
	beforeEach((done) => { //Before each test we empty the database
		Student.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET route
  */
  describe('/GET Student', () => {
	  it('it should GET all the students', (done) => {
			chai.request(server)
		    .get('/biku')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
 /*
  * Test the /POST route
  */
  describe('/POST student', () => {
	  it('it should not POST a student without name field', (done) => {
	  	let student = {
	  		name: "Biku",
	  		id: "34"
	  	}
			chai.request(server)
		    .post('/biku')
		    .send(stud)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('available');
			  	res.body.errors.pages.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a student ', (done) => {
	  	let stud = {
	  		name: "Biku",
	  		id: "34",
	  		available: true
	  	}
			chai.request(server)
		    .post('/biku')
		    .send(stud)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.stud.should.have.property('name');
			  	res.body.stud.should.have.property('id');
			  	res.body.stud.should.have.property('available');
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id student', () => {
	  it('it should GET a student by the given id', (done) => {
	  	let stud = new Student({ name: "Biku", id: "34",available: true });
	  	stud.save((err, stud) => {
	  		chai.request(server)
		    .get('/biku/' + stud.id)
		    .send(stud)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('name');
			  	res.body.should.have.property('id');
			  	res.body.should.have.property('available');
			  	res.body.should.have.property('_id').eql(stud.id);
		      done();
		    });
	  	});
			
	  });
  });
 /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id student', () => {
	  it('it should UPDATE a student given the id', (done) => {
	  	let stud = new Student({name: "Partha", id: "09", available: true})
	  	stud.save((err, stud) => {
				chai.request(server)
			    .put('/biku/' + stud.id)
			    .send({name: "Partha", id: "09", available: true})
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.stud.should.have.property('id').eql("09");
			      done();
			    });
		  });
	  });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id student', () => {
	  it('it should DELETE a student given the id', (done) => {
        let stud = new Student({name: "Partha", id: "09", available: true})
        stud.save((err, stud) => {
            chai.request(server)
            .put('/biku/' + stud.id)
            .send({name: "Partha", id: "09", available: true})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.stud.should.have.property('id').eql("09");
              done();
            });
          });
        });
    });
});
  