import { Request, Response } from "express";
import movieSchema from "../../schemas/userSchema";
import userValidator from "../userValidator";
import { BaseCustomError } from "../../util/const/statuscode";
describe("Movie Validat user input", () => {
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeAll(() => {
    res = {};
  });

  beforeEach(() => {
    next = jest.fn();
  });

  test("should pass validation and call next() for valid input", async () => {
    res = {};
    next = jest.fn();

    const req: Partial<Request> = {
      body: {
        name: "kimlang",
        email: "tiengkimlang@gmail.com",
      },
    };

    await userValidator(movieSchema)(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(); // Assert that next is called with no arguments
    expect(next).toHaveBeenCalledTimes(1); // Ensure that next is called exactly once
  });
  test("should call next() with an InvalidInputError for invalid input", async () => {
    res = {};
    next = jest.fn();

    const req: Partial<Request> = {
      body: {
        name: "kg",
        email: "tiengkimlanggmail.com",
      },
    };

    await userValidator(movieSchema)(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(BaseCustomError)); // Assert that next is called with no arguments
    expect(next).toHaveBeenCalledTimes(1); // Ensure that next is called exactly once
  });
});
