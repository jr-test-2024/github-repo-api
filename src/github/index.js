function createGithubService(client) {
  return {
    getRepos: function () {
      return client.getRepos();
    },
    createRepo(name, public, writeAccessTeams, readAccessTeams) {
      if (public === undefined) {
        public = false;
      }

      return client.createRepo({
        name: name,
        public: public,
        writeAccessTeams: writeAccessTeams,
        readAccessTeams: readAccessTeams
      });
    }
  };
}

module.exports = createGithubService;