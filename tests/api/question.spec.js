const chai = require('chai');
const request = require('supertest');
const { app: server } = require('../../server');
const agent = request.agent(server);

const { expect } = chai;
const should = chai.should();

const BASE_URL = '/api/v1';

describe('/question', () => {
  before((done) => {
    server.on('appStarted', done);
  });
  // beforeEach((done) => {});
  // afterEach((done) => {});
  // after((done) => {});

  const SERVICE = '/questions'
  let questionId;
  const validQuestionRequest = {
    question: "How comfortable do you feel with testing?",
    enrollments: [1234],
  };

  describe('GET: /', () => {
    it('it should return every question (empty)', (done) => {
      agent
        .get(`${BASE_URL}/${SERVICE}`)
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
