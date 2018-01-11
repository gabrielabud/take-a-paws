const Dog = require('../models').Dog;
const cloudinary = require('cloudinary');
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
})

module.exports = {
  create(req, res) {
    var url=null;
    const imageFile = req.files.file;
    cloudinary.uploader.upload(imageFile.path, function(result){
      url = result.url;
      return Dog
      .create({
        name: req.body.name,
        breed: req.body.breed,
        description: req.body.description,
        image: url,
        userId: req.params.userId
      })
      .then(dog => res.status(201).send(dog))
      .catch(error => res.status(400).send(error));
    });
  },

  list(req, res) {
      return Dog
      .all()
      .then(dogs => res.status(200).send(dogs))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Dog
      .findById(req.params.dogId)
      .then(dog => {
        if (!dog) {
          return res.status(404).send({
            message: 'Dog Not Found',
          });
        }
        return res.status(200).send(dog);
      })
      .catch(error => res.status(400).send(error));
  }
};
