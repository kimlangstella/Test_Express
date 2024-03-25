import request from "supertest";
import app from "../../app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
describe("POST", () => {
  it("should create a new user when provided with valid input", async () => {
    const MOCK_USER = {
      _id: new mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
      name: "kimlang",
      released_on: "2023-05-12",
    };

    const response = await request(app)
      .post("/movie")
      .send(MOCK_USER)
      .expect(201);
    expect(response.body.data.name).toBe(MOCK_USER.name);
    expect(response.body.data.released_on).toBe(MOCK_USER.released_on);
  }, 50000);
});
describe("Get", () => {
  it("should Get all user", async () => {
    const MOCK_USER = {
      userId: "4edd40c86762e0fb12000003",
      name: "kimlang",
      released_on: "2023-05-12",
    };
    const response = await request(app)
      .get("/movie")
      .send(MOCK_USER)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toBeDefined();
    // expect(response.body.name).toEqual(MOCK_USER.name);
    // expect(response.body.released_on).toEqual(MOCK_USER.released_on);
  }, 5000);
});
describe("Get by id", () => {
  it("should get one user by id", async () => {
    const MOCK_USER = {
      userId: "4edd40c86762e0fb12000003",
      name: "kimlang",
      released_on: "2023-05-12",
    };
    const response = await request(app)
      .get(`/movie/${MOCK_USER.userId}`)
      .expect("Content-Type", /json/)
      expect(response.body).toBeDefined();
    // expect(response.body.name).toEqual(MOCK_USER.name);
    // expect(response.body.released_on).toEqual(MOCK_USER.released_on);
  }, 5000);
});

