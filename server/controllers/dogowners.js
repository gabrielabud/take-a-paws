const DogOwner = require('../models').DogOwner;

module.exports = {
  create(req, res) {
    return DogOwner
      .create({
        name: req.body.name,
      })
      .then(dogowner => res.status(201).send(dogowner))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return DogOwner
      .all()
      .then(dogowners => res.status(200).send(dogowners))
      .catch(error => res.status(400).send(error));
  }
};