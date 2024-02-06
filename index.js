const express = require('express');
const createRouter = require('./src/router');

const app = express();
const router = createRouter(express.Router());

app.use('/', router);

server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = { app: app, server: server };