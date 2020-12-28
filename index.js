require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/search', routes.productRoutes);
app.use('/member', routes.memberRoutes);
app.use('/', routes.webappRoutes);

app.listen(process.env.PORT, () => {
  console.log(`I'm up at port ${process.env.PORT}!!`);
})