
const Octokit = require('octokit').Octokit;
const octokitClient = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

function createGithubClient() {

  const orgName = 'jr-test-2024';
  return {
    getRepos() {
      return octokitClient.request(`GET /orgs/${orgName}/repos`, {
        type: 'all'
      })
    },
    createRepo: async function (options) {
      return await octokitClient.request(`POST /orgs/${orgName}/repos`, {
        name: options.name,
        private: !options.public
      })
    },
    addWriteAccessToRepo: async function (repoName, teamName) {
      return await octokitClient.request(`PUT /repos/${orgName}/${repoName}/teams/${teamName}`, {
        permission: 'push'
      })
    },
    addReadAccessToRepo: async function (repoName, teamName) {
      return await octokitClient.request(`PUT /repos/${orgName}/${repoName}/teams/${teamName}`, {
        permission: 'pull'
      })
    }
  };
}

module.exports = createGithubClient;