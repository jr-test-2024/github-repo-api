function createGithubService(client) {
  return {
    getRepos: function () {
      return client.getRepos();
    },
    createRepo(name, isPublic) {
      return client.createRepo({
        name: name,
        public: isPublic
      });
    }
  };
}

module.exports = createGithubService;