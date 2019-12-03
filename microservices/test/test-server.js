var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
const faker = require("faker");
const logger = require('../config/logger.config');

chai.use(chaiHttp);

let payload = {
  username:faker.internet.userName(),
  password:faker.internet.password(),
  firstname:faker.name.firstName(),
  lastname:faker.name.lastName(),
  email:faker.internet.email()
}

let newData = {
  username:faker.internet.userName(),
  password:faker.internet.password(),
  firstname:faker.name.firstName(),
  lastname:faker.name.lastName(),
  email:faker.internet.email()
}

let patchData = {
  username:faker.internet.userName(),
  password:faker.internet.password(),
  firstname:faker.name.firstName(),
  lastname:faker.name.lastName(),
  email:faker.internet.email()
}

describe('Users API Testing', function() {
  logger.info('Testing Chai Mocha Test Cases') 
  it('1. should add a SINGLE user on /users POST', function(done) {
    logger.info('Chai Mocha Test Case : add a SINGLE user on /users POST')
    chai.request(server)
      .post('/users')
      .send(payload)
      .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.message.should.equal('User added successfully');
        done();
      });
  });

  it('2. should list ALL users on /users GET', function(done) {
        logger.info('Chai Mocha Test Case : list ALL users on /users GET')
        chai.request(server)
          .get('/users')
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.message.should.equal('Users get successfully');
            done();
          });
  });

it('3. should list single user on /users/:userId GET', function(done) {
  logger.info('Chai Mocha Test Case : list single user on /user/:userId GET')
  chai.request(server)
    .get('/users')
    .end(function(err, res){
      chai.request(server)
      .get('/users/'+res.body.data[0]._id)
      .end(function(err, response){ 
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('status');
        response.body.should.have.property('message');
        response.body.message.should.equal('User get successfully');
        done();
      });
    });
});


it('4. should update a SINGLE user on /users/<userId> PUT', function(done) {
  logger.info('Chai Mocha Test Case : update a user on /users/:userId PUT')
  chai.request(server)
    .get('/users')
    .end(function(err, res){ 
      chai.request(server)
        .put('/users/'+res.body.data[0]._id)
        .send(newData)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('status');
          response.body.should.have.property('message');
          response.body.message.should.equal('User updated successfully');
          done();
      });
    });
}); 

it('5. should update a SINGLE user on /users/<userId> PATCH', function(done) {
  logger.info('Chai Mocha Test Case : update a user on /users/:userId PATCH')
  chai.request(server)
    .get('/users')
    .end(function(err, res){ 
      chai.request(server)
        .patch('/users/'+res.body.data[0]._id)
        .send(patchData)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('status');
          response.body.should.have.property('message');
          response.body.message.should.equal('User updated successfully');
          done();
      });
    });
}); 

it('6. should delete a MULTIPLE user on /user payload["id","id"] DELETE', function(done) {
  logger.info('Chai Mocha Test Case : delete a multiple user on /users payload["id","id"] DELETE')
  chai.request(server)
      .post('/users')
      .send(payload)
      .end(function(err, res){

      chai.request(server)
      .get('/users')
      .end(function(err, res){
        chai.request(server)
        .delete('/users')
        .send([res.body.data[0]._id,res.body.data[1]._id])
        .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('status');
            response.body.should.have.property('message');
            response.body.message.should.equal('Users deleted successfully');
            done();
        });
      });
    });
});



it('7. should delete a SINGLE user on /users/:<id> DELETE', function(done) {
  logger.info('Chai Mocha Test Case : delete a single user on /users/:userId DELETE')
  chai.request(server)
      .post('/users')
      .send(newData)
      .end(function(err, res){

      chai.request(server)
      .get('/users')
      .end(function(err, res){

        chai.request(server)
        .delete('/users/'+res.body.data[0]._id)
        .end(function(error,response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('status');
            response.body.should.have.property('message');
            response.body.message.should.equal('User deleted successfully');
            done();
        });
      }); 
});

});
});