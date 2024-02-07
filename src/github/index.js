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
      try {
        await client.createRepo(options);
      } catch (err) {
        if (!err.response || !err.response.data || err.response.data.message !== 'Repository creation failed.')
          throw err;
      }

      await Promise.all(writeAccessTeams.map(team => client.addWriteAccessToRepo(name, team)));
      if (readAccessTeams) {
        await Promise.all(readAccessTeams.map(team => client.addReadAccessToRepo(name, team)));
      }
    }
  };
}

module.exports = createGithubService;