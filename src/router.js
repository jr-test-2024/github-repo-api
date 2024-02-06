const githubRoutes = require('./routes/github');

const createRouter = function (expressRouter) {
  expressRouter.use('/github', githubRoutes({}, expressRouter));

  return expressRouter;
}

module.exports = createRouter;