var request = require('supertest'),
    should = require('should'),
    setup = require('./setup');

app = setup.app;

describe('GET /u', function() {
  describe('when requesting /u/signup', function() {
    it('should return', function(done) {
      request(app)
        .get('/u/signup')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          console.log(res.text);
          done();
        });
    });
  });
});
