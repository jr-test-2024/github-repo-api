const start = require('../index');

require('./githubRoutes.test')(start.app);

start.server.close();