const createRouter = require('./router');

function startServer(express, githubService) {
  const app = express();
  const router = createRouter(express.Router(), githubService);

  app.use('/', router);

  const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

  return { app: app, server: server };
}

module.exports = startServer;