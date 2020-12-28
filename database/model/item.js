const mongoose = require('mongoose');

const itemSchema = new mongoose({
  name: { type: String, required: true },
  store: { type: String, required: true },
  price: { type: Number, required: true },
  availableinstore: { type: String, required: true },
  availableonline: { type: String, required: true },
  date_created: { type: Date, required: true },
  itemlink: { type: String, required: true },
  detail: { type: String, required: true }
});

itemSchema.index({ name: 1, store: 1, price: 1 })
const ItemModel = new mongoose.model('Item', itemSchema);
