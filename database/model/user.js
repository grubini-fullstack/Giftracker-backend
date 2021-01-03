const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, dropDups: true },
  phone: { type: String },
  //TODO:  look at the payments
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
const getUser = (username) => UserModel.findOne({ username }, { __v: 0 })
  .populate({ path: "wishlist" })
  .populate({ path: "watchlist" });
const updateUser = (user) => UserModel.findOneAndUpdate({ username: user.username }, user);
const addToWatchList = (itemId, userId) => UserModel.updateOne({ _id: userId }, { $addToSet: { watchlist: itemId } });
const deleteFromWatchList = (userId, itemId) => UserModel.updateOne({ _id: userId }, { $pull: { watchlist: itemId } }, { multi: true });
const addToWishList = (itemId, userId) => UserModel.updateOne({ _id: userId }, { $addToSet: { wishlist: itemId } });
const deleteFromWishList = (userId, itemId) => UserModel.updateOne({ _id: userId }, { $pull: { wishlist: itemId } }, { multi: true });
const deleteUser = (username) => UserModel.deleteOne({ username });

module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.userExists = userExists;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.addToWishList = addToWishList;
module.exports.deleteFromWatchList = deleteFromWatchList;
module.exports.addToWatchList = addToWatchList;
module.exports.deleteFromWishList = deleteFromWishList;