const Dog = require('../models').Dog;

module.exports = {
  create(req, res) {
    return Dog
    .create({
      name: req.body.name,
      dogownerId: req.params.dogownerId,
    })
    .then(dog => res.status(201).send(dog))
    .catch(error => res.status(400).send(error));
  },
  
  list(req, res) {
      return Dog
      .all()
      .then(dogs => res.status(200).send(dogs))
      .catch(error => res.status(400).send(error));
  }
};