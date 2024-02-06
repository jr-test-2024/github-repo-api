function createGithubService(client) {
  return {
    getRepos: function () {
      return client.getRepos();
    },
    createRepo(name, isPublic, writeAccessTeams) {
      return client.createRepo({
        name: name,
        public: isPublic,
        writeAccessTeams: writeAccessTeams
      });
    }
  };
}

module.exports = createGithubService;