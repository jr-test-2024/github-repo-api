function createGithubService(client) {
  return {
    getRepos: function () {
      return client.getRepos();
    },
    createRepo(name, isPublic, writeAccessTeams, readAccessTeams) {
      return client.createRepo({
        name: name,
        public: isPublic,
        writeAccessTeams: writeAccessTeams,
        readAccessTeams: readAccessTeams
      });
    }
  };
}

module.exports = createGithubService;