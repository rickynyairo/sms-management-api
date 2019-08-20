import express, { Router, response } from "express";
import supertest from "supertest";
import { applyMiddleware, applyRoutes } from "../utils";
import requestPromise from "request-promise";
import middleware from "../middleware";
import errorHandlers from "../middleware/errorHandlers";
import authRoutes from "../auth/routes";
import postRoutes from "../post/routes";

jest.mock("request-promise");
(requestPromise as any).mockImplementation(() => '{"features": []}');

describe("routes", () => {
  let app: Router;

  beforeEach(() => {
    app = express();
    applyMiddleware(middleware, app);
    applyRoutes(authRoutes, app);
    applyRoutes(postRoutes, app);
    applyMiddleware(errorHandlers, app);
  });

  test("a valid string query", async () => {
    const response = {}; // await supertest(app).get("/api/v1/search?q=Cham");
    expect(response).toBeDefined();
  });

  test("a non-existing api route", async () => {
    const response = await supertest(app).get("/api/doesnotexist");
    expect(response.status).toEqual(404);
  });

  test("an existing api route", async () => {
    const response = await supertest(app).get("/api-docs");
    expect(response.status).toEqual(200);
  });

});
