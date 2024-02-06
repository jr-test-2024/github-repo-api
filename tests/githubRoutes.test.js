const request = require('supertest');

module.exports = (app) => {
  describe('GET /github/repos', () => {
    it('should return a 200 response', (done) => {
      request(app)
        .get('/github/repos')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          // Add your assertions here
          done();
        });
    });
  });
}
