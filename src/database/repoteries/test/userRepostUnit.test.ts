import { UserRepo } from "../repostery";
import { movieModel } from "../../models/movie";
jest.mock("../../models/movie");
describe("Unit Test",()=>{
    let userReposUnit:UserRepo;
    beforeEach(()=>{
        jest.clearAllMocks();
    })
    describe("create User",()=>{
        test("Input a user",async()=>{
            userReposUnit= new UserRepo();
            const Mock_Data={
                _id:"04382309480239o48324",
                name:"kimlang",
                realeased_on:"2024-04-21"
            };
            (movieModel.prototype.save as jest.Mock).mockResolvedValue(Mock_Data);
            const newInput = await userReposUnit.createUser(Mock_Data);
            expect(newInput).toEqual(Mock_Data);
            
        })
    })
    describe("Search byId",()=>{
        test("find id",async()=>{
            userReposUnit= new UserRepo();
            const Mock_Data={
                _id:"04382309480239o48324",
                name:"kimlang",
                realeased_on:"2024-04-21"
            };
            (movieModel.findById as jest.Mock).mockResolvedValue(Mock_Data); // return Mock_Data
            const findId= await userReposUnit.getUserById(Mock_Data._id);
            expect(findId).toEqual(Mock_Data);
        })
    })
    describe("Search AllId",()=>{
        test("find all id",async()=>{
            userReposUnit= new UserRepo();
            const Mock_Data={
                _id:"04382309480239o48324",
                name:"kimlang",
                realeased_on:"2024-04-21"
            };
            (movieModel.find as jest.Mock).mockResolvedValue(Mock_Data);
            const findAllId= await userReposUnit.getUser(); 
            expect(findAllId).toEqual(Mock_Data);
        })
    })
    describe("update by id",()=>{
        test("find id for test",async()=>{
            userReposUnit= new UserRepo();
            const Mock_Data={
                _id:"04382309480239o48324",
                name:"kimlang",
                realeased_on:"2024-04-21"
            };
            const Update_Data={
                _id:"0538509480239o48324",
                name:"Linger",
                realeased_on:"2024-04-23"
            };
            (movieModel.findById as jest.Mock).mockResolvedValue(Update_Data);
            const updateUser= await userReposUnit.updateUserById(Mock_Data._id,Update_Data)
            expect(updateUser).toEqual(Update_Data)
        })
    })
    describe("delete by id",()=>{
        test("delete id",async()=>{
            const Mock_Data={
                _id:"04382309480239o48324",
                name:"kimlang",
                realeased_on:"2024-04-21"
            };
            (movieModel.deleteOne as jest.Mock).mockResolvedValue(Mock_Data);
            const deleteUser=await userReposUnit.deleteUserById(Mock_Data._id);
            expect(deleteUser).toEqual(Mock_Data)
        })
    })
})