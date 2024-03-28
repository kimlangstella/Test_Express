import { Request, Response, NextFunction } from 'express';
import errorHandler from '../errorHandler';
import { BaseCustomError } from '../../util/const/statuscode';
describe('errorHandler', () => {
    // Test case: checking if errorHandler handles BaseCustomError correctly
    it('should handle BaseCustomError and send appropriate response', () => {
      // Creating a mock BaseCustomError instance with a message and status code
      const mockError = new BaseCustomError('Test error', 404);
      
      // Creating mock objects for Request, Response, and NextFunction
      const mockRequest = {} as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(), // Mocking the status method of response
        json: jest.fn(), // Mocking the json method of response
      } as unknown as Response;
      const mockNext = jest.fn() as NextFunction; // Mocking the NextFunction
  
      // Calling the errorHandler function with the mock objects
      errorHandler(mockError, mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: 404,
        message: 'Test error',
      });
      expect(mockNext).toHaveBeenCalled();
    });
  
    // Test case: checking if errorHandler calls next() when error is not a BaseCustomError
    it('should call next if error is not an instance of BaseCustomError', () => {
      // Creating a regular Error instance
      const mockError = new Error('Test error');
      const mockRequest = {} as Request; // Mocking the Request object
      const mockResponse = {} as Response; // Mocking the Response object
      const mockNext = jest.fn() as NextFunction; // Mocking the NextFunction
  
      // Calling the errorHandler function with the mock objects
      errorHandler(mockError, mockRequest, mockResponse, mockNext);
  
      // next for error has call
      expect(mockNext).toHaveBeenCalled();
    });
  });