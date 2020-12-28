const mongoose = require('mongoose');

const getInstance = () => {
  mongoose.connect('mongodb://localhost/giftracker', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(result => {
      console.log('connected to mongo');
    })
    .catch(error => console.log('connection error ', error));
};

const shutDownInstance = () => mongoose.connection.close();

module.exports.getInstance = getInstance;
module.exports.shutDownInstance = shutDownInstance;