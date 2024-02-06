function createGithubService(client) {
  return {
    getRepos: function () {
      return client.getRepos();
    },
    createRepo() {
      return client.createRepo();
    }
  };
}

module.exports = createGithubService;