const User = require('../models').User;
const cloudinary = require('cloudinary');
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
})

module.exports = {

  create(req, res) {
    return User
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        city: req.body.city,
        postcode: req.body.postcode,
        status: req.body.status
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  updateDescription(req, res){
    const description = req.body.description;
    User.findOne({
      where: {
        id: req.params.id
      }
    }).then((user) =>{
      user.updateAttributes({
        description: description
      })
      return user
    })
    .then((user) => res.status(200).send(user))
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    var url = null;
    const imageFile = req.files.file;
    cloudinary.uploader.upload(imageFile.path, function(result) {
      url = result.url;
      User.findOne({
        where: {
          id: req.params.id
        }
      }).then((user) => {
         user.updateAttributes({
            image: url
         })
         return user
      })
      .then((user) => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
    });
  },

  list(req, res) {
    return User
      .all()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  }
};
