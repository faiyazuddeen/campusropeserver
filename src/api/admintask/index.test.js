import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Admintask } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, admintask

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  admintask = await Admintask.create({})
})

test('POST /admintasks 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('POST /admintasks 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /admintasks 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /admintasks 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /admintasks 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /admintasks 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /admintasks 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /admintasks/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${admintask.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(admintask.id)
})

test('GET /admintasks/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${admintask.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /admintasks/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${admintask.id}`)
  expect(status).toBe(401)
})

test('GET /admintasks/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /admintasks/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${admintask.id}`)
    .send({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(admintask.id)
})

test('PUT /admintasks/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${admintask.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /admintasks/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${admintask.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /admintasks/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${admintask.id}`)
  expect(status).toBe(401)
})

test('PUT /admintasks/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey })
  expect(status).toBe(404)
})

test('DELETE /admintasks/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${admintask.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /admintasks/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${admintask.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /admintasks/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${admintask.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /admintasks/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${admintask.id}`)
  expect(status).toBe(401)
})

test('DELETE /admintasks/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
