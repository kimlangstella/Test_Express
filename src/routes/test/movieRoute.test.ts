import request from "supertest";
import app from "../../app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { response } from "express";
import { movieModel } from "../../database/models/movie";
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


describe("POST/movie", () => {
  it("should create a new user when provided with valid input", async () => {
    const MOCK_USER = {
      _id: new mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
      name: "kimlang",
      releash_on:"2021-04-12"
    };

    const response = await request(app)
      .post("/movie")
      .send(MOCK_USER)
      .expect(201);
    expect(response.body.data.name).toBe(MOCK_USER.name);
    expect(response.body.data.releash_on).toBe(MOCK_USER.releash_on)
  }, 50000);
});
describe("Get", () => {
  it("should Get all user", async () => {
    const MOCK_USER = {
      _id: new mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
      name: "kimlang",
      releash_on:"2024-12-03"
    };
    const response = await request(app)
      .get("/movie")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toBeDefined();
  }, 5000);
});
describe("Get by id", () => {
  it("should get one user by id", async () => {
    const Mock_User={
      _id: new mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
      name: "kimlang",
      releash_on:"2024-12-03"
    }
    const user =await movieModel.create(Mock_User);
    const response = await request(app)
      .get(`/movie/${user._id}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
// describe("update by id",()=>{
//   it("Update by id", async () => {
//     const Mock_User={
//       _id: new mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
//       name: "kimlang",
//       released_on: "2023-05-12",
//     }
    
//     const New_User = {
//       _id: new mongoose.Types.ObjectId("4edd40c86762e0fb12000004"),
//       name: "Tola",
//       released_on: "2023-05-22",
//     };
//     await movieModel.create(Mock_User);
//     await request(app)
//       .put(`/movie/${Mock_User._id}}`)
//       .send(New_User)
//       .expect(200);
//   });
// })
describe("delete by id", () => {

  it("should delete by id", async () => {
    const userId= "4edd40c86762e0fb12000003";
    await request(app).delete(`/movie/${userId}`).expect(204);
  });

});


