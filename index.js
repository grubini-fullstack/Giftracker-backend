const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`I'm up at port ${port}!!`);
})