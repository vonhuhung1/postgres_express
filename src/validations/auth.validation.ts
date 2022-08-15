// import { body, validationResult } from 'express-validator';
// import { Request ,Response,NextFunction } from "express";

// export const authValidation =  [
//     body('email')
//         .exists()
//         .isLength({min: 1 , max: 30}).withMessage('email should not be empty, should be more than one and less than 30 character')
//         .isEmail().withMessage('Email not email type')
//         .trim(),
//     function(req:Request,res:Response,next:NextFunction) { 
//         var errorValidation = validationResult(req);
//         if ( errorValidation.isEmpty() ) {
//             return res.status(500).json({
//                 title: 'an error occured',
//                 error: errorValidation.array()
//             });
//         }
//         next()
//     },
//     body('password')
//         .exists()
//         .isLength({min: 1 , max: 30}).withMessage('password should not be empty, should be more than one and less than 30 character')
//         .isStrongPassword().withMessage('password not strong')
//         .trim(),
//     function(req:Request,res:Response,next:NextFunction) {

//         var errorValidation = validationResult(req);
//         if ( errorValidation.isEmpty() ) {
//             return res.status(500).json({
//                 title: 'an error occured',
//                 error: errorValidation.array()
//             });
//         }
//         next()
//     }
// ]