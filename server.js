const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 3001;
server.listen(port);
const socket = require('socket.io');
const io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function(data){
    io.emit('RECEIVE_MESSAGE', data);
  })
});

if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, 'client/build')));
}

const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').load();

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

app.get('/users/:id', (req, res) => {
  models.User.findOne({
    where: {
      id: req.params.id
    }
  }).then((user) => {
      res.status(200).send({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        image: user.image
      })
    })
});

app.get('/error', (req, res) => res.status(200).send({
  message: "404"
}));

app.get('/', (req, res) => res.status(200).send({
  message: "200"
}));

module.exports = app;
