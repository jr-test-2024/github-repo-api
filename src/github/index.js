function createGithubService(client) {
  return {
    getRepos: function () {
      return client.getRepos();
    },
    createRepo: async function (name, options, writeAccessTeams, readAccessTeams) {
      if (!options) options = {};
      if (options.public === undefined) {
        options.public = false;
      }

      options.name = name;
      await client.createRepo(options);
      await Promise.all(writeAccessTeams.map(team => client.addWriteAccessToRepo(name, team)));
      if (readAccessTeams) {
        await Promise.all(readAccessTeams.map(team => client.addReadAccessToRepo(name, team)));
      }
    }
  };
}

module.exports = createGithubService;