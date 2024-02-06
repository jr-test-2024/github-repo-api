require('should');

describe('Getting a list of repositories', () => {
  it('should return a list of repositories', (done) => {
    const githubClient = { getRepos: () => new Promise((resolve) => resolve(['repo1', 'repo2'])) };

    githubService = require('../src/github')(githubClient);

    githubService.getRepos().then((repos) => {
      repos.length.should.equal(2);
      repos[0].should.equal('repo1');
      repos[1].should.equal('repo2');
      done();
    }).catch(err => done(err));
  })
});

describe('Creating a new repository', () => {
  it('should make a request to create a new repository', (done) => {
    const githubClient = {
      createRepo: () => new Promise((resolve) => {
        done()
        return resolve({})
      })
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo').catch(err => done(err));
  });

  it('should submit a repository name', (done) => {
    const githubClient = {
      createRepo: (name) => new Promise((resolve) => {
        name.should.equal('newRepo');
        done()
        return resolve({})
      })
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo').catch(err => done(err));
  });
});