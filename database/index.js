const mongoose = require('mongoose');
const { UserModel, ItemModel } = require('./model');

const getInstance = () => {
  mongoose.connect('mongodb://localhost/giftracker', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('connected to mongo'))
    .catch(error => console.log('connection error ', error));
};

const shutDownInstance = () => mongoose.connection.close();

module.exports.UserModel = UserModel;
module.exports.ItemModel = ItemModel;
module.exports.getInstance = getInstance;
module.exports.shutDownInstance = shutDownInstance;