const routeGithub = (githubService, router) => {

  router.get('/repos', async (req, res) => {
    res.send('A list of repos')
  });

  return router;
}

module.exports = routeGithub;