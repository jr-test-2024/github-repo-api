const request = require('supertest');
require('should');

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
      .send({})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        server.server.close();

        // Add your assertions here
        specifiedName.should.equal('my-repo');
        done();
      });
  });

  it('should create a public repo when public is set to true', (done) => {
    let specifiedPublic = false;
    function fakeCreateRepo(name, public) {
      specifiedPublic = public;
      return new Promise((resolve) => {
        resolve({});
      });
    }

    const server = require('../src/server')(
      require('express'),
      { createRepo: fakeCreateRepo });

    request(server.app)
      .post('/github/repo/my-repo')
      .send({ public: true })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        server.server.close();
        // Add your assertions here

        specifiedPublic.should.equal(true);
        done();
      });
  });

  it('should create a private repo when public is not set', (done) => {
    let specifiedPublic = true;
    function fakeCreateRepo(name, public) {
      specifiedPublic = public;
      return new Promise((resolve) => {
        resolve({});
      });
    }

    const server = require('../src/server')(
      require('express'),
      { createRepo: fakeCreateRepo });

    request(server.app)
      .post('/github/repo/my-repo')
      .send({})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        server.server.close();
        // Add your assertions here

        specifiedPublic.should.equal(false);
        done();
      });
  });
});
