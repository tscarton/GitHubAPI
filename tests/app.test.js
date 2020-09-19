const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
let expect = chai.expect;

describe('Testing the app', () => {

   it('Access / ', (done) => {
      chai.request(app)
         .get('/')
         .end((err, res) => {
            expect(res.status).to.equal(501);
            done();
         });
   });

   it('Accessing without token ', (done) => {
      chai.request(app)
         .get('/api/repositories')
         .end((err, res) => {
            expect(res.status).to.equal(403);
            done();
         });
   });

   it('Accessing with dummy token ', () => {
      chai.request(app)
         .get('/api/repositories')
         .set('token', 'dummy')
         .end((err, res) => {
            expect(res.status).to.equal(403);
            done();
         });
   });
})