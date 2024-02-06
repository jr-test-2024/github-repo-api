const start = require('../index');

require('./githubRoutes.test')(start.app);

require('./githubService.test')

start.server.close();

