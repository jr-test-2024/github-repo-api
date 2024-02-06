const express = require('express');
const createRouter = require('./src/router');

const app = express();
const router = createRouter(express.Router());

app.use('/', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});