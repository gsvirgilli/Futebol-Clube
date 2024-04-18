import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

chai.use(chaiHttp);

const { app } = new App()
const { expect } = chai;

describe('Fluxo 3: Matches', () => {
  describe('GET /matches', () => {
    it('Retorna todos os matches', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array');
    });
    it('Retorna todos os matches em progresso', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array');
    });
    it('Retorna todos os matches finalizados', async () => {
      const response = await chai.request(app).get('/matches?inProgress=false');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array');
    });
    it('Verifica se não retorna o mesmo tipo de dado', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.not.be.an('string');
    });
    it('Sera valido que não é possivel alterar uma partida sem o token de autenticação', async () => {
      const response = await chai.request(app).patch('/matches/1');

      expect(response.status).to.be.equal(401);
    });
  });
});