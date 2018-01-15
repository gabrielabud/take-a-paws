process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const should = require('chai').should;
const expect = require('chai').expect;
const app = require('../../app.js')

describe('Users', function() {
  it('should POST a new user', function(done) {
    supertest(app)
    .post('/signup')
    .set('Accept', 'application/x-www-form-urlencoded')
    .send({
      firstname: "Foo",
      lastname: "Bar",
      email: "test53@gmail.com",
      username: "Foo",
      password: "123456",
      city: "London",
      postcode: "E11",
      type: "Owner"
    })
    .expect(201)
    .end(function(err,res) {
      expect({success:true});
      done();
    });
  });
  it('should GET a list of users', function(done) {
    supertest(app)
    .get('/api/users')
    .expect(200)
    .end(function(err, res) {
      expect(res.body[0]).to.have.property("firstname");
      expect(res.body[0].firstname).to.equal("Foo");
      expect(res.body[0]).to.have.property("lastname");
      expect(res.body[0].lastname).to.equal("Bar");
      expect(res.body[0]).to.have.property("username");
      expect(res.body[0].username).to.equal("Foo");
      expect(res.body[0]).to.have.property("password");
      expect(res.body[0]).to.have.property("email");
      expect(res.body[0].email).to.equal("test53@gmail.com");
      done();
    });
  });
});

describe('Dogs', function() {
  it('should POST a new Dog', function(done) {
    supertest(app)
    .post('/api/users/1/dogs')
    .set('Accept', 'multipart/form-data')
    .field('name', 'Max')
    .field('breed', 'Dobermann')
    .field('description', 'test dog')
    .attach('file', './public/dobermann.jpg')
    .expect(201)
    .end(function(err,res) {
      expect({success:true});
      done();
    });
  });

  it('should GET a list of dogs', function(done) {
    supertest(app)
    .get('/api/dogs')
    .expect(200)
    .end(function(err, res) {
      expect(res.body[0]).to.have.property("name");
      expect(res.body[0].name).to.equal("Max");
      expect(res.body[0]).to.have.property("breed");
      expect(res.body[0].breed).to.equal("Dobermann");
      expect(res.body[0]).to.have.property("description");
      expect(res.body[0].description).to.equal("test dog");
      expect(res.body[0]).to.have.property("image");
      expect(res.body[0].image).to.equal("http://res.cloudinary.com/dqcs0clma/image/upload/v1516054739/b5jc1u5f7rczesciskxv.jpg");
      done();
    });
  });
});
