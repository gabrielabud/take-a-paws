process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const should = require('chai').should;
const expect = require('chai').expect;
const assert = require('chai').assert;
const User = require('../../server/models/user.js')
const app = require('../../app.js')

after(function(done) {
  let server = app.listen(3001)
  server.close(done);
});
describe('/GET users', function() {
  it('should GET a list of users', function(done) {
    supertest(app)
    .get('/api/users/1')
    .expect(200)
    .end(function(err, res) {
      expect(res.body[0]).to.have.property("firstname");
      expect(res.body[0].firstname).to.equal("Andrew");
      expect(res.body[0]).to.have.property("lastname");
      expect(res.body[0].lastname).to.equal("Davey");
      expect(res.body[0]).to.have.property("username");
      expect(res.body[0].username).to.equal("Andrew");
      expect(res.body[0]).to.have.property("password");
      expect(res.body[0]).to.have.property("email");
      expect(res.body[0].email).to.equal("test@gmail.com");
      done()
    });
  });
});

describe('/POST signup', function() {
  it('should POST a new user', function(done) {
    supertest(app)
    .post('/signup')
    .set('Accept', 'application/x-www-form-urlencoded')
    .send({
      firstname: "Foo",
      lastname: "Bar",
      email: "test53@gmail.com",
      username: "Andrew",
      password: "123456",
      city: "London",
      postcode: "E11",
      type: "Owner"
    })
    .end(function(err,res) {
      expect((res.status) === (201));
      expect({success:true});
      done()
    });
  });
});
