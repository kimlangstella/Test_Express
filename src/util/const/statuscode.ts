// const statusCodes = {
//     SUCCESS: 200,
//     BAD_REQUEST: 400,
//     UNAUTHORIZED: 401,
//     FORBIDDEN: 403,
//     NOT_FOUND: 404,
//     SERVER_ERROR: 500
// };

// const statusMessages = {
//     [statusCodes.SUCCESS]: "Success",
//     [statusCodes.BAD_REQUEST]: "Bad Request",
//     [statusCodes.UNAUTHORIZED]: "Unauthorized",
//     [statusCodes.FORBIDDEN]: "Forbidden",
//     [statusCodes.NOT_FOUND]: "Not Found",
//     [statusCodes.SERVER_ERROR]: "Internal Server Error"
// };

// export { statusCodes, statusMessages };
export class BaseCustomError extends Error {
    [x: string]: any;
    constructor(message: string | undefined, statusCode: number) {
      super(message); // Call the super constructor (Error class)
      this.statusCode = statusCode; // Custom property to hold status code
      this.name = this.constructor.name; // Set the name of the error to the class name
      Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}
