import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MovieRepo } from "../repostery";
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
  let MovieRepositoryInstance: MovieRepo; // Renamed for clarity

  beforeEach(() => {
    MovieRepositoryInstance = new MovieRepo();// for use method that have in class
  });

  describe("createMovie", () => {
    test("should add a movie", async () => {
      // Added descriptive test name
      const MOCK_Movie = {
        _id: new mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
        name: "test_user",
        releash_on:"2024-12-03" // Corrected property name to match schema (assuming 'releasedOn')
      };
      const newMovie = await MovieRepositoryInstance.createMovie(MOCK_Movie);

      // Assert
      expect(newMovie).toBeDefined();
      expect(newMovie._id).toBeDefined();
      expect(newMovie.name).toEqual(MOCK_Movie.name);
      expect(newMovie.releash_on).toEqual(MOCK_Movie.releash_on);
    });
  });

  describe("getumoviebyid", () => {
    test("find moviebyid", async () => {
      const MOCK_Movie = {
        MovieId: "4edd40c86762e0fb12000003",
        name: "test_user",
        releash_on:"2024-12-03", // Corrected property name to match schema (assuming 'releasedOn')
      };

      const foundMovie = await MovieRepositoryInstance.getMovieById(
        MOCK_Movie.MovieId
      );

      expect(foundMovie).toBeDefined();
      expect(foundMovie?.name).toEqual(MOCK_Movie.name);
      expect(foundMovie?._id).toEqual(
        new mongoose.Types.ObjectId(MOCK_Movie.MovieId)
      );
      expect(foundMovie?.releash_on).toEqual(MOCK_Movie.releash_on);
    });
  });

    describe("updatemoviebyid", () => {
      test("updatebyid", async () => {
        const MOCK_Movie = {
            userId: "4edd40c86762e0fb12000003",
            name: "test_user",
            releash_on:"2024-12-03" // Corrected property name to match schema (assuming 'releasedOn')
          };
        const newMovie = await MovieRepositoryInstance.createMovie(MOCK_Movie);

        const newMovies = {
            _id: new mongoose.Types.ObjectId("4edd40c86762e0fb12000004"),
          name: "testuser",
          releash_on:"2024-12-04",
        };
        //  (movieModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(newUsers);
        const updateUser = await MovieRepositoryInstance.updateMovieById(
          MOCK_Movie.userId,
          newMovies
        );
        expect(updateUser).toBeDefined();
        expect(updateUser?.name).toEqual(newMovies.name);
        expect(updateUser?._id).toEqual(newMovies._id);
        expect(updateUser?.releash_on).toEqual(newMovies.releash_on);
      });
    });
  describe("delete moviebyid", () => {
    test("datebyid", async () => {
      const MOCK_Movie = {
        name: "test_user",
        released_on: "2024-02-13", // Corrected property name to match schema (assuming 'releasedOn')
      };

      const deleteMovie = await MovieRepositoryInstance.deleteMovieById(
        "4edd40c86762e0fb12000003"
      );
      expect(deleteMovie).toBeDefined();
      // expect(deleteUser.name).toEqual(MOCK_USER.name)
      // expect(deleteUser._id).toEqual(MOCK_USER._id);
      // expect(deleteUser. released_on).toEqual(MOCK_USER.released_on);
    });
  });
});
