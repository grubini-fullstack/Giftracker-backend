const axios = require('axios');

const _bestBuyProductDetail = (product) => {
  return axios.get(`${process.env.BEST_BUY_BASE_URL}((search=${product}))?apiKey=${process.env.BEST_BUY_KEY}&sort=color.asc&show=regularPrice,salePrice,addToCartUrl,color,condition,description,details.name,freeShipping,features.feature,inStoreAvailability,includedItemList.includedItem,modelNumber,thumbnailImage&format=json`)
    .then(result => result.data)
    .catch(error => {
      console.log('there was an error with best buy\'s api, ', error);
      return 'there was an error with best buy\'s api';
    });
}

exports.searchProduct = (req, res, next) => {
  const { keyword } = req.query;
  console.log('this is the product everyone is looking for ', keyword);
  Promise.all([_bestBuyProductDetail(keyword)])
    .then(results => res.status(200).send(results))
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