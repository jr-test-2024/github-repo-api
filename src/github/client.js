
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
    createRepo(options) {
      return octokitClient.request(`POST /orgs/${orgName}/repos`, {
        name: options.name,
        private: !options.public
      })
    }
  };
}

module.exports = createGithubClient;