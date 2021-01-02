const bcrypt = require('bcrypt');
const db = require('../database');



const _formattingErrors = (error) => {
  let errors;
  console.log('t ', error)
  if (!error) {
    errors = 'Unknown error';
  } else if (error.errors) {
    errors = Object.keys(error.errors);
  } else {
    switch (error.code) {
      case 11000:
        errors = 'Username already exists';
        break;
      case 1000:
        errors = 'User does not exist';
        break;
      case 2000:
        errors = 'User does not exists with those credentials, please try again';
        break;
      default:
        errors = 'User handling had an error';
    }
  }
  return errors;
};
const _retrieveUser = async (username) => {
  const user = await db.UserModel.getUser(username);
  if (!user) {
    return false;
  }
  return user;
};

exports.login = async (req, res, next) => {
  let data;
  let status = 0;
  try {
    const { username = '', password = '' } = req.body;
    console.log(username, password)
    const user = await _retrieveUser(username);
    if (!user) {
      throw { code: 2000 };
    }
    if (await bcrypt.compare(password, user.password)) {
      status = 1;
      const newSession = await db.SessionModel.create(user.__id, user.username);
      data = {
        firstname: user.firstname,
        lastname: user.lastname,
        session: newSession
      };
    }
    res.status(200).send({ status, data });
  } catch (err) {
    data = _formattingErrors(err);
    res.status(404).send({ status, data });
  }
};

exports.userExists = async (req, res, next) => {
  let data = { error: true };
  try {
    const { username = '' } = req.query;
    const isActive = await db.UserModel.userExists(username);
    res.status(200).send({ status: isActive ? 0 : 1, data: isActive });
  } catch (err) {
    console.log('error verifying if username exists, ', err);
    data.error = _formattingErrors(err);
    res.status(404).send({ status, data });
  }
};

exports.createUser = async (req, res, next) => {
  let data = { error: 'User was not able to be created, please try again' };
  let status = 0;
  try {
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
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.UserModel.createUser({
      firstname, lastname, email, phone, payments, notifications, username,
      password: encryptedPassword, birthday, watchlist, wishlist, socialwishlist, friends
    });
    if (!newUser) {
      throw newUser;
    }
    status = 1;
    data = newUser;
    res.status(200).send({ status, data });
  } catch (err) {
    console.log('There was an error creating the user, ', err);
    data.error = _formattingErrors(err);
    res.status(404).send({ status, data });
  }
};

exports.updateUser = async (req, res, next) => {
  let data = { error: 'User was not able to be updated, please try again' };
  let status = 0;
  try {
    const {
      firstname = '',
      lastname = '',
      email = '',
      phone = '',
      payments = {},
      notifications = false,
      username = '',
      birthday = '',
      watchlist = [],
      wishlist = [],
      socialwishlist = [],
      friends = []
    } = req.body;
    const user = await _retrieveUser(username);
    const userUpdated = {
      ...user, firstname, lastname, email, phone, payments, notifications,
      birthday, watchlist, wishlist, socialwishlist, friends
    };
    const updatedUser = await db.UserModel.updateUser(userUpdated);
    if (!updatedUser) {
      throw updatedUser;
    }
    status = 1;
    res.status(200).send({ status, data: updatedUser });
  } catch (err) {
    console.log('error updating the user, ', err);
    data.error = _formattingErrors(err);
    res.status(404).send({ status, data });
  }
};

exports.deleteUser = async (req, res, next) => {
  let data = { error: 'User was not able to be deleted, please try again' };
  let status = 0;
  try {
    const { username, password } = req.body;
    const userToDelete = await _retrieveUser(username);
    if (!userToDelete) {

      throw { code: 1000 };
    }
    const userDeleted = await db.UserModel.deleteUser(username);
    status = 1;
    res.status(200).send({ status, data: userDeleted });
  } catch (err) {
    console.log('error deleting the user, ', err);
    data.error = _formattingErrors(err);
    res.status(404).send({ status, data });
  }
};