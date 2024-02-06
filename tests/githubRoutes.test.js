const request = require('supertest');

describe('GET /github/repos', () => {
  const server = require('../src/server')(require('express'), require('../src/github')());
  it('should return a 200 response', (done) => {
    request(server.app)
      .get('/github/repos')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here
        done();

        server.server.close();
      });
  });
});

describe('POST /github/repo/my-repo creates a repo called my repo', () => {
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

  it('should return a 200 response', (done) => {
    request(server.app)
      .post('/github/repo/my-repo')
      .send({})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here
        done();
        server.server.close();
      });
  });
});
