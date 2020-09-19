const app = require('../app');
const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const GitController = require('../GitController');
const sandbox = require('sinon').createSandbox()

chai.use(chaiHttp);
let expect = chai.expect;
let token = 'a2b19364d25a5bb12798656d1bd150661c2d09ae';

const jsonMockResponse = {
   'repositories': [
      {
         'name': 'test1',
         'url': 'fakeGit/test1',
         'language': 'JS'
      },
      {
         'name': 'test2',
         'url': 'fakeGit/test2',
         'language': 'JS'
      }
   ]
};

describe('Testing the app', () => {

   afterEach(() => {
      sandbox.restore();
    })

  
   it('Create Git Client ', async () => {
      let client = GitController.createGitClient('dummy');
      expect(client).to.not.be.undefined
   });

   it('List repos using filter with token ', async () => {
      try {
         await GitController.listRepo();
      } catch (error) {
         expect(error).to.equal(500);
      }
   });

   it('List repos ', async () => {
      sandbox.stub(GitController, 'listRepo').returns(jsonMockResponse);
      let response = await GitController.listRepo();
      expect(response).to.have.property('repositories');
    });
})