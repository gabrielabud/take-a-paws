const express = require('express');
const app = express();

const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').load();

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

const logger = require('morgan');
app.use(logger('dev'));


app.use(bodyParser.urlencoded({ extended: true }));  /* Check making it true */
app.use(bodyParser.json());

app.use(session({ secret: 'take-a-paws', resave: true, saveUninitialized:true }));
app.use(passport.initialize());
app.use(passport.session());

const models = require('./server/models');

const authRoute = require('./server/routes/auth.js')(app, passport);

require('./server/routes')(app);
require('./server/config/passport/passport.js')(passport, models.User);

app.get('/id/:email', (req, res) => {
  models.User.findOne({
    where: {
      email: req.params.email
    }
  }).then((user) => {
    res.status(200).send({ id: user.id })
  })
});

app.get('/error', (req, res) => res.status(200).send({
  message: "404"
}));

app.get('/', (req, res) => res.status(200).send({
  message: "200"
}));

app.get('*', (req, res) => res.status(200).send({
  message: "Welcome"
}));
module.exports = app;
