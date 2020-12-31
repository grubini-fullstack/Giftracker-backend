const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'asdflaksdjfvjlkjzlkciojasdlkzxchsfjsdfh7ifuhsdhfxmvnasjklwyhjkvv';

const sessionSchema = new mongoose.Schema({
  token: { type: String, required: true },
  creation_date: { type: Date, required: true },
  duration_hrs: { type: String, requied: true }
});

sessionSchema.index({ token: 1 });
const SessionModel = new mongoose.model('Session', sessionSchema);

const create = (id, username) => {
  const newSession = {
    token: jwt.sign({ id, username }, JWT_SECRET),
    creation_date: moment(),
    duration_hrs: 1
  };
  return new SessionModel(newSession).save();
};
const _get = (token) => {
  SessionModel.findOne({ token }, { __v: 0 })
    .then(res => console.log(res))
    .catch(e => console.log(e))
};
const _delete = (token) => {
  SessionModel.deleteOne({ token })
    .then(res => console.log(res))
    .catch(e => console.log(e))
}
const isValid = (session) => {
  const dateInFuture = moment(session.creation_date).add(session.duration_hrs, 'hours');
  const difference = dateInFuture.diff(moment(), 'minutes');
  const isExpired = difference <= 0;
  if (isExpired) {
    _delete(session.token);
    return false;
  }
  return true;
};


module.exports.create = create;
module.exports.isValid = isValid;

