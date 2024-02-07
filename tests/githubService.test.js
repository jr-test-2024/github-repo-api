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
    });
  })
});

describe('Creating a new repository', () => {
  it('should make a request to create a new repository', (done) => {
    const githubClient = {
      createRepo: () => new Promise((resolve) => {
        done()
        return resolve({})
      }),
      addWriteAccessToRepo: () => new Promise((resolve) => resolve({}))
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo');
  });

  it('should submit a repository name', (done) => {
    const githubClient = {
      createRepo: (options) => new Promise((resolve) => {
        options.name.should.equal('newRepo');
        done()
        return resolve({})
      }),
      addWriteAccessToRepo: () => new Promise((resolve) => resolve({}))
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo', false, []);
  });

  it('should submit a public visibility option', (done) => {
    const githubClient = {
      createRepo: (options) => new Promise((resolve) => {
        options.public.should.equal(true);
        done()
        return resolve({})
      }),
      addWriteAccessToRepo: () => new Promise((resolve) => resolve({}))
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo', { public: true }, []);
  });

  it('should submit public as false if options is not set', (done) => {
    const githubClient = {
      createRepo: (options) => new Promise((resolve) => {
        options.public.should.equal(false);
        done()
        return resolve({})
      }),
      addWriteAccessToRepo: () => new Promise((resolve) => resolve({}))
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo', undefined, []);
  });

  it('should submit public as false if public is not set', (done) => {
    const githubClient = {
      createRepo: (options) => new Promise((resolve) => {
        options.public.should.equal(false);
        done()
        return resolve({})
      }),
      addWriteAccessToRepo: () => new Promise((resolve) => resolve({}))
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo', {}, []);
  });

  it('should be able to turn on projects', (done) => {
    const githubClient = {
      createRepo: (options) => new Promise((resolve) => {
        options.projects.should.equal(true);
        done();
        return resolve({});
      }),
      addWriteAccessToRepo: () => new Promise((resolve) => resolve({}))
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo', { projects: true, public: false }, []);
  });

  it('should be able to turn on issues', (done) => {
    const githubClient = {
      createRepo: (options) => new Promise((resolve) => {
        options.issues.should.equal(true);
        done();
        return resolve({});
      }),
      addWriteAccessToRepo: () => new Promise((resolve) => resolve({}))
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo', { issues: true, public: false }, []);
  });

  it('should be able to turn on discussions', (done) => {
    const githubClient = {
      createRepo: (options) => new Promise((resolve) => {
        options.discussions.should.equal(true);
        done();
        return resolve({});
      }),
      addWriteAccessToRepo: () => new Promise((resolve) => resolve({}))
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo', { discussions: true, public: false }, []);
  });

  it('should be able to turn on wikis', (done) => {
    const githubClient = {
      createRepo: (options) => new Promise((resolve) => {
        options.wikis.should.equal(true);
        done();
        return resolve({});
      }),
      addWriteAccessToRepo: () => new Promise((resolve) => resolve({}))
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo', { wikis: true, public: false }, []);
  });

  it('should grant all the teams specified write access', (done) => {
    let callsToGrantAccess = 0;
    const teamsGranted = []
    const githubClient = {
      createRepo: () => new Promise((resolve) => resolve({})),
      addWriteAccessToRepo: (repo, team) => new Promise((resolve) => {
        repo.should.equal('newRepo');
        teamsGranted.push(team);
        callsToGrantAccess++;
        return resolve({})
      })
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo', false, ['team1', 'team2'])
      .catch(err => done(err))
      .then(() => {
        callsToGrantAccess.should.equal(2);
        teamsGranted.should.eql(['team1', 'team2']);
        done()
      })
  });

  it('should submit a set of team names for read access', (done) => {
    let callsToGrantAccess = 0;
    const teamsGranted = []
    const githubClient = {
      createRepo: () => new Promise((resolve) => resolve({})),
      addWriteAccessToRepo: () => new Promise((resolve) => resolve({})),
      addReadAccessToRepo: (repo, team) => new Promise((resolve) => {
        repo.should.equal('newRepo');
        teamsGranted.push(team);
        callsToGrantAccess++;
        return resolve({})
      })
    };

    githubService = require('../src/github')(githubClient);

    githubService.createRepo('newRepo', false, [], ['team1', 'team2'])
      .catch(err => done(err))
      .then(() => {
        callsToGrantAccess.should.equal(2);
        teamsGranted.should.eql(['team1', 'team2']);
        done()
      })
  });
});

describe('Modifying repository access', () => {
  it('should be able to grant write access to a team on an already existing repo', async () => {
    const githubClient = {
      createRepo: () => new Promise((resolve, reject) => {
        const error = new Error('bad');
        error.response = { data: { message: 'Repository creation failed.' } };
        reject(error);
      }),
      addWriteAccessToRepo: () => new Promise((resolve) => resolve({}))
    };

    githubService = require('../src/github')(githubClient);

    await githubService.createRepo('newRepo', {}, []);
  });
}); 