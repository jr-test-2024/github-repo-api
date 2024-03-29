const request = require('supertest');
require('should');

describe('GET /github/repos', () => {
  function fakeGetRepos() {
    return new Promise((resolve) => {
      resolve({ data: ['repo1', 'repo2'] });
    });
  }
  const server = require('../src/server')(require('express'), { getRepos: fakeGetRepos });
  it('should return a 200 response', (done) => {
    request(server.app)
      .get('/github/repos')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here
        done();
      });
    server.server.close();
  });
});

describe('POST /github/repo/my-repo', () => {

  it('should create a repository called my-repo', (done) => {
    let specifiedName = '';
    function fakeCreateRepo(name) {
      specifiedName = name;
      return new Promise((resolve) => {
        resolve({});
      });
    }

    const server = require('../src/server')(
      require('express'),
      { createRepo: fakeCreateRepo });

    request(server.app)
      .post('/github/repo/my-repo')
      .send({ writeTeamAccess: ['my-team'] })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        // Add your assertions here
        specifiedName.should.equal('my-repo');
        done();
      });
    server.server.close();
  });

  it('should create a public repo when public is set to true', (done) => {
    let specifiedPublic = false;
    function fakeCreateRepo(name, options) {
      specifiedPublic = options.public;
      return new Promise((resolve) => {
        resolve({});
      });
    }

    const server = require('../src/server')(
      require('express'),
      { createRepo: fakeCreateRepo });

    request(server.app)
      .post('/github/repo/my-repo')
      .send({ public: true, writeTeamAccess: ['my-team'] })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here

        specifiedPublic.should.equal(true);
        done();
      });
    server.server.close();
  });

  it('should return a 400 response when no write teams are submitted', (done) => {
    const server = require('../src/server')(
      require('express'),
      {
        createRepo: () => new Promise((resolve) => {
          resolve({});
        })
      });

    request(server.app)
      .post('/github/repo/my-repo')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
    server.server.close();
  });
});
