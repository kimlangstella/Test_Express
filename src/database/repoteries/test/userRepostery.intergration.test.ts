import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MovieRepo } from "../repostery";
import { ObjectId } from "mongoose";
import { UserRepo } from "../userRepostery";
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
describe("Intergration Test in User",()=>{
    let UserRepository:UserRepo;
    beforeEach(()=>{
        UserRepository= new UserRepo();
    });
    describe("create new user",()=>{
        test("should add a user",async()=>{
            const New_user={
                name:"kimlang",
                email:"tiengkimlang@gmail.com",
                password:"123kimlang#$"
            }
            const newUser=await UserRepository.createUser(New_user);
            expect(newUser).toBeDefined();
        })
    })
})