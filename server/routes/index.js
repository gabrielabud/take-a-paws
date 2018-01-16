const usersController = require('../controllers').users;
const dogsController = require('../controllers').dogs;
const messagesController = require('../controllers').messages;
const requestsController = require('../controllers').requests;
const fileParser = require('connect-multiparty')();

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to take a paws!',
  }));

  app.post('/api/users/:userId/dogs', fileParser, dogsController.create);
  app.get('/api/dogs', dogsController.list);
  app.get('/api/dogs/:dogId', dogsController.retrieve);
  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);
  app.post('/api/users/:userId/:dogId/requests', requestsController.create);
  app.get('/api/users/:userId/:dogId/requests', requestsController.retrieve);
  app.get('/api/users/:userId/requests', requestsController.retrieveByUser);
  app.get('/api/requests/:dogId', requestsController.list);
  app.put('/api/requests/:requestId', requestsController.update);
  app.delete('/api/requests/:requestId', requestsController.destroy);
  app.post('/api/users/image/:id', fileParser, usersController.update);
  app.post('/api/users/description/:id', fileParser, usersController.updateDescription);
  app.post('/api/messages', messagesController.create);
  app.get('/api/messages', messagesController.list)
  app.get('/api/messages/names', messagesController.getNames)
};
