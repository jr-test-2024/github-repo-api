function createGithubService(client) {
  return {
    getRepos: function () {
      return client.getRepos();
    },
    createRepo(name) {
      return client.createRepo({
        name: name
      });
    }
  };
}

module.exports = createGithubService;