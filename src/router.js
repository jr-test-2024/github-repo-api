const githubRoutes = require('./routes/github');

const createRouter = function (expressRouter, githubService) {
  expressRouter.use('/github', githubRoutes(githubService, expressRouter));

  return expressRouter;
}

module.exports = createRouter;