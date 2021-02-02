const mongoose = require('mongoose');
const { UserModel, ItemModel, SessionModel } = require('./model');

const getInstance = () => {
  mongoose.connect('mongodb://localhost/giftracker', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('connected to mongo'))
    .catch(error => console.log('connection error ', error));
};

const shutDownInstance = () => mongoose.connection.close();

module.exports.UserModel = UserModel;
module.exports.ItemModel = ItemModel;
module.exports.SessionModel = SessionModel;
module.exports.getInstance = getInstance;
module.exports.shutDownInstance = shutDownInstance;