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
const _get = (token) => SessionModel.findOne({ token }, { __v: 0 });
const _delete = (token) => SessionModel.deleteOne({ token });

const isValid = async (session) => {
  const storedSession = await _get(session._token);
  if (!storedSession) return false;

  const dateInFuture = moment(storedSession.creation_date).add(storedSession.duration_hrs, 'hours');
  const difference = dateInFuture.diff(moment(), 'minutes');
  const isExpired = difference <= 0;
  if (isExpired) {
    _delete(storedSession.token);
    return false;
  }
  return true;
};


module.exports.create = create;
module.exports.isValid = isValid;

