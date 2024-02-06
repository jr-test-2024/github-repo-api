function createGithubService(client) {
  return {
    getRepos: function () {
      return client.getRepos();
    },
    createRepo(name, isPublic, readAccessTeams) {
      return client.createRepo({
        name: name,
        public: isPublic,
        readAccessTeams: readAccessTeams
      });
    }
  };
}

module.exports = createGithubService;