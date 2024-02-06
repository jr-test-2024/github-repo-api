const bodyParser = require('body-parser');

const routeGithub = (githubService, router) => {

  router.get('/repos', async (req, res) => {
    githubService.getRepos().catch(err => {
      res.status(500).send(err)
    }).then(response => {
      var repoList = response.data.map(repo => repo.name);
      res.send(repoList);
    });
  });

  router.post('/repo/:name', bodyParser.json(), async (req, res) => {
    if (!req.body.writeTeamAccess || req.body.writeTeamAccess.length === 0) {
      return res.status(400).send('writeTeamAccess is required');
    }

    const result = await githubService.createRepo(req.params.name, req.body.public);
    if (result.err) {
      return res.status(500).send(result.err);
    }
    res.send('Repo created');
  });

  return router;
}

module.exports = routeGithub;