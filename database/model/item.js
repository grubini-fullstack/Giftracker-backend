const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  _name: { type: String, required: true },
  _store: { type: String, required: true },
  _regularPrice: { type: String, required: true },
  _salePrice: { type: String, required: true },
  _condition: { type: String, required: true },
  _details: [{
    name: { type: String, required: true },
    value: { type: String, required: true },
    values: { type: Array }
  }],
  _freeShipping: { type: Boolean, required: true },
  _addToCartUrl: { type: String, required: true },
  _color: { type: String, required: true },
  _features: [{
    feature: { type: String, required: true }
  }],
  _includedItemList: [{
    includedItem: { type: String, required: true }
  }],
  _onlineAvailability: { type: Boolean, required: true },
  _modelNumber: { type: String, required: true },
  _image: { type: String, required: true }
});

itemSchema.index({ modelNumber: 1 });
const ItemModel = new mongoose.model('Item', itemSchema);

const getItemId = (_modelNumber) => ItemModel.findOne({ _modelNumber }, { _id: 1 });

const addOrUpdateItem = (item) => ItemModel.updateOne({ _modelNumber: item._modelNumber }, item, { upsert: true, setDefaultsOnInsert: true });

const updateItem = () => {

};

module.exports.addOrUpdateItem = addOrUpdateItem;
module.exports.updateItem = updateItem;
module.exports.getItemId = getItemId;
