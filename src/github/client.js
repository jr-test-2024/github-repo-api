
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
        private: !options.public,
        has_projects: options.projects,
        has_issues: options.issues,
        has_discussions: options.discussions,
        has_wiki: options.wiki
      })
    },
    addWriteAccessToRepo: async function (repoName, teamName) {
      return await octokitClient.request(`PUT /orgs/${orgName}/teams/${teamName}/repos/${orgName}/${repoName}`, {
        permission: 'push'
      })
    },
    addReadAccessToRepo: async function (repoName, teamName) {
      return await octokitClient.request(`PUT /orgs/${orgName}/teams/${teamName}/repos/${orgName}/${repoName}`, {
        permission: 'pull'
      })
    }
  };
}

module.exports = createGithubClient;