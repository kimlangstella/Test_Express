import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { UserRepo } from "../repostery";
import { ObjectId } from "mongoose";

let mongoServer: MongoMemoryServer | undefined;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start(); // Ensure server is started before getting URI
  const mongoUri = mongoServer.getUri(); // Now get the URI
  await mongoose.connect(mongoUri); // Type cast to ConnectOptions
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer?.stop();
});

describe("Integration Test", () => {
  let userRepositoryInstance: UserRepo; // Renamed for clarity

  beforeEach(() => {
    userRepositoryInstance = new UserRepo();// for use method that have in class
  });

  describe("createUser", () => {
    test("should add a user", async () => {
      // Added descriptive test name
      const MOCK_USER = {
        _id: new mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
        name: "test_user",
        email:"tiengkimlang@gmail.com" // Corrected property name to match schema (assuming 'releasedOn')
      };
      const newUser = await userRepositoryInstance.createUser(MOCK_USER);

      // Assert
      expect(newUser).toBeDefined();
      expect(newUser._id).toBeDefined();
      expect(newUser.name).toEqual(MOCK_USER.name);
      expect(newUser.email).toEqual(MOCK_USER.email);
    });
  });

  describe("getuserbyid", () => {
    test("find userbyid", async () => {
      const MOCK_USER = {
        userId: "4edd40c86762e0fb12000003",
        name: "test_user",
        email:"tiengkimlang@gmail.com", // Corrected property name to match schema (assuming 'releasedOn')
      };

      const foundUser = await userRepositoryInstance.getUserById(
        MOCK_USER.userId
      );

      expect(foundUser).toBeDefined();
      expect(foundUser?.name).toEqual(MOCK_USER.name);
      expect(foundUser?._id).toEqual(
        new mongoose.Types.ObjectId(MOCK_USER.userId)
      );
      expect(foundUser?.email).toEqual(MOCK_USER.email);
    });
  });

    describe("updateuserbyid", () => {
      test("updatebyid", async () => {
        const MOCK_USER = {
            userId: "4edd40c86762e0fb12000003",
            name: "test_user",
            email:"tiengkimlang@gmail.com" // Corrected property name to match schema (assuming 'releasedOn')
          };
        const newUser = await userRepositoryInstance.createUser(MOCK_USER);

        const newUsers = {
            _id: new mongoose.Types.ObjectId("4edd40c86762e0fb12000004"),
          name: "testuser",
          email:"tiengkimling@gmail.com",
        };
        //  (movieModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(newUsers);
        const updateUser = await userRepositoryInstance.updateUserById(
          MOCK_USER.userId,
          newUsers
        );
        expect(updateUser).toBeDefined();
        expect(updateUser?.name).toEqual(newUsers.name);
        expect(updateUser?._id).toEqual(newUsers._id);
        expect(updateUser?.email).toEqual(newUsers.email);
      });
    });
  describe("delete userbyid", () => {
    test("datebyid", async () => {
      const MOCK_USER = {
        name: "test_user",
        released_on: "2024-02-13", // Corrected property name to match schema (assuming 'releasedOn')
      };

      const deleteUser = await userRepositoryInstance.deleteUserById(
        "4edd40c86762e0fb12000003"
      );
      expect(deleteUser).toBeDefined();
      // expect(deleteUser.name).toEqual(MOCK_USER.name)
      // expect(deleteUser._id).toEqual(MOCK_USER._id);
      // expect(deleteUser. released_on).toEqual(MOCK_USER.released_on);
    });
  });
});
