var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);



describe('Users API Testing', function() {

  it('1. should add a SINGLE user on /users POST', function(done) {
    chai.request(server)
      .post('/users')
      .send({
        "username":"poonam123@",
        "password":"poonam123#@",
        "firstname":"Poonam",
        "lastname":"Gawali",
        "email":"poonam.gawali@gmail.com"
      })
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


it('4. should update a SINGLE user on /user/<id> PUT', function(done) {
  chai.request(server)
    .get('/users')
    .end(function(err, res){ 
      chai.request(server)
        .put('/users/'+res.body.data[0]._id)
        .send({
          "username":"poonam123@",
          "password":"poonam123#@",
          "firstname":"Poonam",
          "lastname":"Pisal",
          "email":"poonam.pisal@gmail.com"
        })
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

it('5. should delete a MULTIPLE user on /user payload["id","id"] DELETE', function(done) {
  chai.request(server)
      .post('/users')
      .send({
        "username":"santosh123@",
        "password":"santosh123#@",
        "firstname":"Santosh",
        "lastname":"Pisal",
        "email":"santosh.pisal@gmail.com"
      })
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



it('6. should delete a SINGLE user on /users/:<id> DELETE', function(done) {
  chai.request(server)
      .post('/users')
      .send({
        "username":"amol123@",
        "password":"amol123#@",
        "firstname":"Amol",
        "lastname":"Gawali",
        "email":"amol.gawali@gmail.com"
      })
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