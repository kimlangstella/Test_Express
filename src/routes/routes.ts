// /* tslint:disable */
// /* eslint-disable */
// // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
// import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
// import { userController } from './../controllers/user.controller';
// // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
// import { MovieController } from './../controllers/movie.controller';
// import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

// const models: TsoaRoute.Models = {
//     "RequestBody": {
//         "dataType": "refObject",
//         "properties": {
//             "name": {"dataType":"string","required":true},
//             "email": {"dataType":"string","required":true},
//             "password": {"dataType":"string","required":true},
//         },
//         "additionalProperties": false,
//     },
//     // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//     "Options": {
//         "dataType": "refObject",
//         "properties": {
//             "page": {"dataType":"double","required":true},
//             "limit": {"dataType":"double","required":true},
//         },
//         "additionalProperties": false,
//     },
//     // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//     "RequestBodys": {
//         "dataType": "refObject",
//         "properties": {
//             "name": {"dataType":"string","required":true},
//             "releash_on": {"dataType":"string","required":true},
//         },
//         "additionalProperties": false,
//     },
//     // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
// };
// const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

// export function RegisterRoutes(app: Router) {
//     // ###########################################################################################################
//     //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
//     //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
//     // ###########################################################################################################
//         app.post('/user',
//             ...(fetchMiddlewares<RequestHandler>(userController)),
//             ...(fetchMiddlewares<RequestHandler>(userController.prototype.createUser)),

//             function userController_createUser(request: ExRequest, response: ExResponse, next: any) {
//             const args: Record<string, TsoaRoute.ParameterSchema> = {
//                     requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RequestBody"},
//             };

//             // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

//             let validatedArgs: any[] = [];
//             try {
//                 validatedArgs = templateService.getValidatedArgs({ args, request, response });

//                 const controller = new userController();

//               templateService.apiHandler({
//                 methodName: 'createUser',
//                 controller,
//                 response,
//                 next,
//                 validatedArgs,
//                 successStatus: undefined,
//               });
//             } catch (err) {
//                 return next(err);
//             }
//         });
//         // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//         app.get('/user',
//             ...(fetchMiddlewares<RequestHandler>(userController)),
//             ...(fetchMiddlewares<RequestHandler>(userController.prototype.getAll)),

//             function userController_getAll(request: ExRequest, response: ExResponse, next: any) {
//             const args: Record<string, TsoaRoute.ParameterSchema> = {
//                     options: {"in":"queries","name":"options","required":true,"ref":"Options"},
//             };

//             // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

//             let validatedArgs: any[] = [];
//             try {
//                 validatedArgs = templateService.getValidatedArgs({ args, request, response });

//                 const controller = new userController();

//               templateService.apiHandler({
//                 methodName: 'getAll',
//                 controller,
//                 response,
//                 next,
//                 validatedArgs,
//                 successStatus: undefined,
//               });
//             } catch (err) {
//                 return next(err);
//             }
//         });
//         // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//         app.get('/user/:userId',
//             ...(fetchMiddlewares<RequestHandler>(userController)),
//             ...(fetchMiddlewares<RequestHandler>(userController.prototype.getById)),

//             function userController_getById(request: ExRequest, response: ExResponse, next: any) {
//             const args: Record<string, TsoaRoute.ParameterSchema> = {
//                     userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
//             };

//             // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

//             let validatedArgs: any[] = [];
//             try {
//                 validatedArgs = templateService.getValidatedArgs({ args, request, response });

//                 const controller = new userController();

//               templateService.apiHandler({
//                 methodName: 'getById',
//                 controller,
//                 response,
//                 next,
//                 validatedArgs,
//                 successStatus: undefined,
//               });
//             } catch (err) {
//                 return next(err);
//             }
//         });
//         // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//         app.put('/user/:userId',
//             ...(fetchMiddlewares<RequestHandler>(userController)),
//             ...(fetchMiddlewares<RequestHandler>(userController.prototype.updateUser)),

//             function userController_updateUser(request: ExRequest, response: ExResponse, next: any) {
//             const args: Record<string, TsoaRoute.ParameterSchema> = {
//                     userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
//                     requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RequestBody"},
//             };

//             // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

//             let validatedArgs: any[] = [];
//             try {
//                 validatedArgs = templateService.getValidatedArgs({ args, request, response });

//                 const controller = new userController();

//               templateService.apiHandler({
//                 methodName: 'updateUser',
//                 controller,
//                 response,
//                 next,
//                 validatedArgs,
//                 successStatus: undefined,
//               });
//             } catch (err) {
//                 return next(err);
//             }
//         });
//         // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//         app.delete('/user/:userId',
//             ...(fetchMiddlewares<RequestHandler>(userController)),
//             ...(fetchMiddlewares<RequestHandler>(userController.prototype.deleteById)),

//             function userController_deleteById(request: ExRequest, response: ExResponse, next: any) {
//             const args: Record<string, TsoaRoute.ParameterSchema> = {
//                     userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
//             };

//             // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

//             let validatedArgs: any[] = [];
//             try {
//                 validatedArgs = templateService.getValidatedArgs({ args, request, response });

//                 const controller = new userController();

//               templateService.apiHandler({
//                 methodName: 'deleteById',
//                 controller,
//                 response,
//                 next,
//                 validatedArgs,
//                 successStatus: undefined,
//               });
//             } catch (err) {
//                 return next(err);
//             }
//         });
//         // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//         app.post('/movie',
//             ...(fetchMiddlewares<RequestHandler>(MovieController)),
//             ...(fetchMiddlewares<RequestHandler>(MovieController.prototype.createMovie)),

//             function MovieController_createMovie(request: ExRequest, response: ExResponse, next: any) {
//             const args: Record<string, TsoaRoute.ParameterSchema> = {
//                     requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RequestBodys"},
//             };

//             // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

//             let validatedArgs: any[] = [];
//             try {
//                 validatedArgs = templateService.getValidatedArgs({ args, request, response });

//                 const controller = new MovieController();

//               templateService.apiHandler({
//                 methodName: 'createMovie',
//                 controller,
//                 response,
//                 next,
//                 validatedArgs,
//                 successStatus: undefined,
//               });
//             } catch (err) {
//                 return next(err);
//             }
//         });
//         // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//         app.get('/movie',
//             ...(fetchMiddlewares<RequestHandler>(MovieController)),
//             ...(fetchMiddlewares<RequestHandler>(MovieController.prototype.getAll)),

//             function MovieController_getAll(request: ExRequest, response: ExResponse, next: any) {
//             const args: Record<string, TsoaRoute.ParameterSchema> = {
//             };

//             // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

//             let validatedArgs: any[] = [];
//             try {
//                 validatedArgs = templateService.getValidatedArgs({ args, request, response });

//                 const controller = new MovieController();

//               templateService.apiHandler({
//                 methodName: 'getAll',
//                 controller,
//                 response,
//                 next,
//                 validatedArgs,
//                 successStatus: undefined,
//               });
//             } catch (err) {
//                 return next(err);
//             }
//         });
//         // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//         app.get('/movie/:movieId',
//             ...(fetchMiddlewares<RequestHandler>(MovieController)),
//             ...(fetchMiddlewares<RequestHandler>(MovieController.prototype.getById)),

//             function MovieController_getById(request: ExRequest, response: ExResponse, next: any) {
//             const args: Record<string, TsoaRoute.ParameterSchema> = {
//                     movieId: {"in":"path","name":"movieId","required":true,"dataType":"string"},
//             };

//             // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

//             let validatedArgs: any[] = [];
//             try {
//                 validatedArgs = templateService.getValidatedArgs({ args, request, response });

//                 const controller = new MovieController();

//               templateService.apiHandler({
//                 methodName: 'getById',
//                 controller,
//                 response,
//                 next,
//                 validatedArgs,
//                 successStatus: undefined,
//               });
//             } catch (err) {
//                 return next(err);
//             }
//         });
//         // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//         app.put('/movie/:movieId',
//             ...(fetchMiddlewares<RequestHandler>(MovieController)),
//             ...(fetchMiddlewares<RequestHandler>(MovieController.prototype.updateUser)),

//             function MovieController_updateUser(request: ExRequest, response: ExResponse, next: any) {
//             const args: Record<string, TsoaRoute.ParameterSchema> = {
//                     movieId: {"in":"path","name":"movieId","required":true,"dataType":"string"},
//                     requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RequestBodys"},
//             };

//             // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

//             let validatedArgs: any[] = [];
//             try {
//                 validatedArgs = templateService.getValidatedArgs({ args, request, response });

//                 const controller = new MovieController();

//               templateService.apiHandler({
//                 methodName: 'updateUser',
//                 controller,
//                 response,
//                 next,
//                 validatedArgs,
//                 successStatus: undefined,
//               });
//             } catch (err) {
//                 return next(err);
//             }
//         });
//         // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//         app.delete('/movie/:movieId',
//             ...(fetchMiddlewares<RequestHandler>(MovieController)),
//             ...(fetchMiddlewares<RequestHandler>(MovieController.prototype.deleteById)),

//             function MovieController_deleteById(request: ExRequest, response: ExResponse, next: any) {
//             const args: Record<string, TsoaRoute.ParameterSchema> = {
//                     movieId: {"in":"path","name":"movieId","required":true,"dataType":"string"},
//             };

//             // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

//             let validatedArgs: any[] = [];
//             try {
//                 validatedArgs = templateService.getValidatedArgs({ args, request, response });

//                 const controller = new MovieController();

//               templateService.apiHandler({
//                 methodName: 'deleteById',
//                 controller,
//                 response,
//                 next,
//                 validatedArgs,
//                 successStatus: undefined,
//               });
//             } catch (err) {
//                 return next(err);
//             }
//         });
//         // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

//     // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


//     // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
// }

// // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
