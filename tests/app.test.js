const server = require('../app');
const request = require('supertest');
const chai = require('chai');
var sinon = require('sinon');

let expect = chai.expect;
let token = 'a2b19364d25a5bb12798656d1bd150661c2d09ae';

describe('Testing the app', () => {
   it('Accessing without token ', async () => {
      const response = await request(server).get('/api/repositories');
      expect(response.status).to.equal(403);
   });

   it('Accessing with dummy token ', async () => {
      try {
         request(server).get('/api/repositories').set('token', 'dummy');
      } catch(error) {
         expect(error).to.equal(500);
      }
   });

   it('List repos using real token ', async () => {
      const response = await request(server).get('/api/repositories').set('token', token);
      expect(response.status).to.equal(200);
   });

   it('List repos using filter with real token ', async () => {
      const response = await request(server).get('/api/repositories').set('token', token).query({ name: 'test' });
      expect(response.status).to.equal(200);
   });
   

})