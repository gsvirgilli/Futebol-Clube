import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTeam from '../database/models/teams'
import { team, teams } from './mocks/team.mock';

chai.use(chaiHttp);

const { app } = new App()
const { expect } = chai;

describe('Testando Fluxo 1:Teams', function () {
  it('Verificando se lista totas as equipes', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Verificando se esta retornando uma equipe por id', async function () {
    sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/3');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  afterEach(sinon.restore);
});