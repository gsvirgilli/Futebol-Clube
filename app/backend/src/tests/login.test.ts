import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUser from '../database/models/users'
import UserMocks from './mocks/Login.mock';

chai.use(chaiHttp);

const { app } = new App()
const { expect } = chai;

describe('Testando Fluxo 2:Login', function () {
  it('Verificando que os dados são validos devem retornar um token', async function () {
    const requestBody = UserMocks.validLoginBody;
    const mockFindOneReturn = SequelizeUser.build(UserMocks.adminUser);
    sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);

    const { status, body } = await chai.request(app).post('/login').send(requestBody);

    expect(status).to.be.equal(200);
    expect(body).to.have.key('token');
  });

  it('Verificando se o email invalido, deve retornar um erro', async function () {
    const requestBody = UserMocks.invalidEmailFormat;
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send(requestBody);

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: "Invalid email or password" })
  });

  it('Verificando se a senha invalida, deve retornar um erro', async function () {
    const requestBody = UserMocks.invalidPassword;
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send(requestBody);

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: "Invalid email or password" })
  });

  it('Verificando se o email não existe, deve retornar um erro', async function () {
    const requestBody = UserMocks.invalidEmailFormat;
    sinon.stub(SequelizeUser, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(requestBody);
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: "Invalid email or password" })
  });

  it('Vefiricando se estiver sem email, deve retornar um erro', async function () {
    const requestBody = UserMocks.emptyEmail;

    const { status, body } = await chai.request(app).post('/login').send(requestBody);

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: "All fields must be filled" })
  });

  it('Veficando se estiver sem senha, deve retornar um erro', async function () {
    const requestBody = UserMocks.emptyPassword;

    const { status, body } = await chai.request(app).post('/login').send(requestBody);

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: "All fields must be filled" })
  });

  afterEach(sinon.restore);
});

