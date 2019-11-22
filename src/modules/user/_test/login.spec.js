// import { expect } from ('chai');
import request from 'supertest';
import app from '../../../index';
// import { expect } from 'chai';

/**
 * Testing get all user endpoint
 */
describe('Test without DB ----- GET /info', function() {
  it('respond with json containing a list of all users', function(done) {
    // expect(1).eq(1);
    // done();

    request(app)
      .get('/info')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Перед звпуском этого теста база дожеа быть чистой
describe('Test with DB ------- User register', function() {
  it('respond with json containing a list of all users', function(done) {
    request(app)
      .post('/user')
      .send({
        email: Math.random() + 's1@pasv.us',
        password: '123123',
        name: 'John Doe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
