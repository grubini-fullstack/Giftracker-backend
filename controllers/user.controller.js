const db = require('../database');

exports.login = (req, res, next) => {
  const { username = '', password = '' } = req.query;
  db.UserModel.getUser({ username, password })
    .then(result => {
      if (!result) {
        throw result;
      }
      res.status(200).send(result);
    })
    .catch(error => {
      console.log('There was an error login in the user, ', error);
      res.status(404).send({ message: 'there was an errot with the login in of the user' });
    });
};

exports userExists = (req, res, next) => {
  const { username = '' } = req.query;
  db.UserModel.userExists(username)
    .then(result => {
      if (!result) {
        throw result;
      }
      res.status(200).send(result);
    })
    .catch(error => {
      console.log('error verifying if username exists, ', error);
      res.status(404).send({ message: 'there was an error with the verification, please try again' });
    });
};

exports.createUser = (req, res, next) => {
  const {
    firstname = '',
    lastname = '',
    email = '',
    phone = '',
    payments = {},
    notifications = false,
    username = '',
    password = '',
    birthday = '',
    watchlist = [],
    wishlist = [],
    socialwishlist = [],
    friends = []
  } = req.body;
  db.UserModel.createUser({
    firstname,
    lastname,
    email,
    phone,
    payments,
    notifications,
    username,
    password,
    birthday,
    watchlist,
    wishlist,
    socialwishlist,
    friends
  })
    .then(result => {
      if (!result) {
        throw result;
      }
      res.status(200).send(result);
    })
    .catch(error => {
      console.log('error creating the user, ', error);
      res.status(404).send({ message: 'there was an error with the user\'s creation, please try again' });
    });
};

exports.updateUser = (req, res, next) => {
  const {
    firstname = '',
    lastname = '',
    email = '',
    phone = '',
    payments = {},
    notifications = false,
    username = '',
    password = '',
    birthday = '',
    watchlist = [],
    wishlist = [],
    socialwishlist = [],
    friends = []
  } = req.body;
  db.UserModel.updateUser({
    firstname,
    lastname,
    email,
    phone,
    payments,
    notifications,
    username,
    password,
    birthday,
    watchlist,
    wishlist,
    socialwishlist,
    friends
  })
    .then(result => {
      if (!result) {
        throw result;
      }
      res.status(200).send(result);
    })
    .catch(error => {
      console.log('error updating the user, ', error);
      res.status(404).send({ message: 'there was an error with updating the user, please try again' });
    });
};

exports.deleteUser = (req, res, next) => {
  const { username, password } = req.body;
  db.UserModel.deletUser({ username, password })
    .then(result => {
      if (!result) {
        throw result;
      }
      res.status(200).send(result);
    })
    .catch(error => {
      console.log('error deliting the user, ', error);
      res.status(404).send({ message: 'there was an error with deleting this user, please try again' });
    });
};