function createGithubService(client) {
  return {
    getRepos: function () {
      return client.getRepos();
    }
  };
}

module.exports = createGithubService;