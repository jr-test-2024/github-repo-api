const Ocktokit = require('@octokit/rest');
const octokitClient = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

function createGithubClient() {
  const orgName = 'jr-test-2024';
  return {
    getRepos() {
      return fetch(`https://api.github.com/orgs/${orgName}/repos`, {
        headers: {
          'Authorization': `token ${token}`
        }
      }).then(response => response.json());
    },
    createRepo(options) {
      octokitClient.request(`POST /orgs/${orgName}/repos`, {
        name: options.name,
        private: !options.public
      })
    }
  };
}

module.exports = createGithubClient;