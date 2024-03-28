import { MovieRepo } from "../repostery";
import { movieModel } from "../../models/movie";
import { Options } from "tsoa";
jest.mock("../../models/movie");
describe("Unit Test",()=>{
    let userReposUnit:MovieRepo;
    beforeEach(()=>{
        jest.clearAllMocks();
    })
    describe("create User",()=>{
        test("Input a user",async()=>{
            userReposUnit= new MovieRepo();
            const Mock_Data={
                _id:"04382309480239o48324",
                name:"kimlang",
                releash_on:"2024-12-03"
            };
            (movieModel.prototype.save as jest.Mock).mockResolvedValue(Mock_Data);
            const newInput = await userReposUnit.createMovie(Mock_Data);
            expect(newInput).toEqual(Mock_Data);
            
        })
    })
    describe("Search byId",()=>{
        test("find id",async()=>{
            userReposUnit= new MovieRepo();
            const Mock_Data={
                _id:"04382309480239o48324",
                name:"kimlang",
                releash_on:"2024-12-03"
            };
            (movieModel.findById as jest.Mock).mockResolvedValue(Mock_Data); // return Mock_Data
            const findId= await userReposUnit.getMovieById(Mock_Data._id);
            expect(findId).toEqual(Mock_Data);
        })
    })
    // describe("Search AllId",()=>{
    //     test("find all id",async()=>{
    //         userReposUnit= new UserRepo();
    //         const Mock_Data={
    //             _id:"04382309480239o48324",
    //             name:"kimlang",
    //             email:"tiengkimlang@gmail.com"
    //         };
    //         (movieModel.find as jest.Mock).mockResolvedValue(Mock_Data);
    //         const findAllId= await userReposUnit.getUser(); 
    //         expect(findAllId).toEqual(Mock_Data);
    //     })
    // })
    describe("update by id",()=>{
        test("find id for test",async()=>{
            userReposUnit= new MovieRepo();
            const Mock_Data={
                _id:"04382309480239o48324",
                name:"kimlang",
                releash_on:"2024-12-03"
            };
            const Update_Data={
                _id:"0538509480239o48324",
                name:"Linger",
                releash_on:"2024-12-03"
            };
            (movieModel.findById as jest.Mock).mockResolvedValue(Update_Data);
            const updateMovie= await userReposUnit.updateMovieById(Mock_Data._id,Update_Data)
            expect(updateMovie).toEqual(Update_Data)
        })
    })
    describe("delete by id",()=>{
        test("delete id",async()=>{
            const Mock_Data={
                _id:"04382309480239o48324",
                name:"kimlang",
                releash_on:"2024-12-03"
            };
            (movieModel.deleteOne as jest.Mock).mockResolvedValue(Mock_Data);
            const deleteMovie=await userReposUnit.deleteMovieById(Mock_Data._id);
            expect(deleteMovie).toEqual(Mock_Data)
        })
    })
})