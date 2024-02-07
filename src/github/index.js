function createGithubService(client) {
  return {
    getRepos: function () {
      return client.getRepos();
    },
    createRepo: async function (name, public, writeAccessTeams, readAccessTeams) {
      if (public === undefined) {
        public = false;
      }

      await client.createRepo({
        name: name,
        public: public
      });
      await Promise.all(writeAccessTeams.map(team => client.addWriteAccessToRepo(name, team)));
      if (readAccessTeams) {
        await Promise.all(readAccessTeams.map(team => client.addReadAccessToRepo(name, team)));
      }
    }
  };
}

module.exports = createGithubService;