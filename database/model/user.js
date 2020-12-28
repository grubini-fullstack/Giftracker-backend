const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  payments: { type: Object },
  notifications: { type: Boolean },
  username: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  birthday: { type: Date, required: true },
  watchlist: [{
    type: mongoose.Schema.Types.ObjectId,
    notification: { type: Boolean, required: true, default: false },
    ref: 'Item',
    default: []
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    notification: { type: Boolean, required: true, default: false },
    ref: 'Item',
    default: []
  }],
  socialwishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    notification: { type: Boolean, required: true, default: false },
    ref: 'Item',
    default: []
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }]
});
userSchema.index({ username: 1 });
const UserModel = new mongoose.model('User', userSchema);

const createUser = (user) => new UserModel(user).save();
const userExists = (username) => UserModel.exists({ username });
const getUser = ({ username, password }) => UserModel.findOne({ username, password }, { __v: 0 });
const updateUser = (user) => UserModel.findOneAndUpdate({ username: user.username, password: user.password }, user);
const deleteUser = ({ username, password }) => UserModel.deleteOne({ username, password });

module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.userExists = userExists;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;