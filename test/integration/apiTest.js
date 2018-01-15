process.env.NODE_ENV = 'test';
import db from '../../server/models/index.js'
const supertest = require('supertest');
const should = require('chai').should;
const expect = require('chai').expect;
const app = require('../../app.js')
console.log(typeof(db))
describe('/GET users', function() {
  after(function(done) {
    let server = app.listen(3001)
    server.close(done);
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

  it('should POST a new Dog', function(done) {
    supertest(app)
    .post('/api/users/1/dogs')
    .set('Accept', 'application/form-data')
    .send({
      name: "Dog",
      breed: "Golden Retriever",
      description: "test dog",
      file: '../../public/dobermann.jpg'
    })
    .expect(201)
    .end(function(err,res) {
      expect({success:true});
      done()
    });
});
