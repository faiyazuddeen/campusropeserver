import request from "supertest";
import { apiRoot } from "../../config";
import { signSync } from "../../services/jwt";
import express from "../../services/express";
import { User } from "../user";
import routes, { UserProfile } from ".";

const app = () => express(apiRoot, routes);

let userSession, anotherSession, userProfile;

beforeEach(async () => {
  const user = await User.create({ email: "a@a.com", password: "123456" });
  const anotherUser = await User.create({
    email: "b@b.com",
    password: "123456"
  });
  userSession = signSync(user.id);
  anotherSession = signSync(anotherUser.id);
  userProfile = await UserProfile.create({ createdBy: user });
});

test("POST /user_profiles 201 (user)", async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession });
  expect(status).toBe(201);
  expect(typeof body).toEqual("object");
  expect(typeof body.createdBy).toEqual("object");
});

test("POST /user_profiles 401", async () => {
  const { status } = await request(app()).post(`${apiRoot}`);
  expect(status).toBe(401);
});

test("GET /user_profiles 200 (user)", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
  expect(typeof body[0].createdBy).toEqual("object");
});

test("GET /user_profiles 401", async () => {
  const { status } = await request(app()).get(`${apiRoot}`);
  expect(status).toBe(401);
});

test("GET /user_profiles/:id 200 (user)", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${userProfile.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
  expect(typeof body).toEqual("object");
  expect(body.id).toEqual(userProfile.id);
  expect(typeof body.createdBy).toEqual("object");
});

test("GET /user_profiles/:id 401", async () => {
  const { status } = await request(app()).get(`${apiRoot}/${userProfile.id}`);
  expect(status).toBe(401);
});

test("GET /user_profiles/:id 404 (user)", async () => {
  const { status } = await request(app())
    .get(apiRoot + "/123456789098765432123456")
    .query({ access_token: userSession });
  expect(status).toBe(404);
});

test("PUT /user_profiles/:id 200 (user)", async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${userProfile.id}`)
    .send({ access_token: userSession });
  expect(status).toBe(200);
  expect(typeof body).toEqual("object");
  expect(body.id).toEqual(userProfile.id);
  expect(typeof body.createdBy).toEqual("object");
});

test("PUT /user_profiles/:id 401 (user) - another user", async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${userProfile.id}`)
    .send({ access_token: anotherSession });
  expect(status).toBe(401);
});

test("PUT /user_profiles/:id 401", async () => {
  const { status } = await request(app()).put(`${apiRoot}/${userProfile.id}`);
  expect(status).toBe(401);
});

test("PUT /user_profiles/:id 404 (user)", async () => {
  const { status } = await request(app())
    .put(apiRoot + "/123456789098765432123456")
    .send({ access_token: anotherSession });
  expect(status).toBe(404);
});

test("DELETE /user_profiles/:id 204 (user)", async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${userProfile.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(204);
});

test("DELETE /user_profiles/:id 401 (user) - another user", async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${userProfile.id}`)
    .send({ access_token: anotherSession });
  expect(status).toBe(401);
});

test("DELETE /user_profiles/:id 401", async () => {
  const { status } = await request(app()).delete(
    `${apiRoot}/${userProfile.id}`
  );
  expect(status).toBe(401);
});

test("DELETE /user_profiles/:id 404 (user)", async () => {
  const { status } = await request(app())
    .delete(apiRoot + "/123456789098765432123456")
    .query({ access_token: anotherSession });
  expect(status).toBe(404);
});
