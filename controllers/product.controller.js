const axios = require('axios');
const db = require('../database');


const _bestBuyProductDetail = (product) => {
  return axios.get(`${process.env.BEST_BUY_BASE_URL}((search=${product}))?apiKey=${process.env.BEST_BUY_KEY}&sort=color.asc&show=name,regularPrice,salePrice,addToCartUrl,color,condition,description,details.name,freeShipping,features.feature,onlineAvailability,includedItemList.includedItem,modelNumber,image&format=json`)
    .then(result => result.data)
    .catch(error => {
      console.log('there was an error with best buy\'s api, ', error);
      return 'there was an error with best buy\'s api';
    });
}

exports.searchProduct = (req, res, next) => {
  const { keyword } = req.query;
  Promise.all([_bestBuyProductDetail(keyword)])
    .then(results => res.status(200).send(results[0].products))
    .catch(error => {
      console.log('there was an error with getting product for multiple stores, ', error);
      res.status(404).send({ message: 'there was an error, please try again' });
    })
};
exports.searchStore = (req, res, next) => {
  const { store = '', keyword = '' } = req.query;
  switch (store) {
    case 'best buy':
      return _bestBuyProductDetail(keyword)
        .then(result => res.status(200).send(result))
        .catch(error => {
          console.log('best buy error is ', error);
          res.status(404).send({ message: 'there was an error, please try again' });
        });
    case 'target':
      console.log('it\'s target!!!!!');
      break;
    default:
      console.log('unknown store!!!');
      break;
  }
};
exports.addProduct = async (req, res, next) => {
  console.log('i gt heree')
  const { category, item, session } = req.body;
  console.log('the sess ', session.decoded.payload.id)
  const update = await db.ItemModel.addOrUpdateItem(item);
  if (update.ok) {
    const fetchedItem = await db.ItemModel.getItemId(item._modelNumber);
    console.log(fetchedItem._id, ' ', session._id)
    const user = await db.UserModel.addToWishList(fetchedItem._id, session.decoded.payload.id);
  }
  // console.log('the id is ,', update.ok)
};
exports.deleteProduct = async (req, res, next) => {
  const { category, itemId } = req.body;
  console.log('req cat, ', category, ' id ', itemId);
  const deleted = db.UserModel.deleteFromWishList(session.decoded.payload.id, itemId);
  console.log('deletetd ', deleted);
};