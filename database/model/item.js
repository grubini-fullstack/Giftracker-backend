const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  store: { type: String, required: true },
  price: { type: Number, required: true },
  availableinstore: { type: Boolean, required: true },
  availableonline: { type: Boolean, required: true },
  date_created: { type: Date, required: true },
  itemlink: { type: String, required: true },
  detail: { type: String, required: true }
});

itemSchema.index({ name: 1, store: 1, price: 1 });
const ItemModel = new mongoose.model('Item', itemSchema);

const addItem = (item) => {

};

const updateItem = () => {

};

module.exports.addItem = addItem;
module.exports.updateItem = updateItem;
