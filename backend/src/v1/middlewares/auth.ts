import 'dotenv/config';
import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../utils/statusCodes';
import { UserToken, tokenData } from '../../../types';
/**
 * @access private
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
// Bearer <Token>
const auth = (req:Request,res:Response,next:NextFunction) =>{
    const requestHeader = req.headers["x-access-token"];
    const token = (requestHeader as string).split(' ')[1];
    if(!token){
       return res.status(statusCodes.Unauthorized).json({message:"a token is required "});
    }
   try{
   const decoded  = jwt.verify(token,process.env.SECRET_KEY as string);
   (req as UserToken).user  = decoded as tokenData;
   req.params = { ...req.params };
   next();
   }
   catch(err){
     return res.status(statusCodes.Unauthorized).json({message:"Invalid token"});
   }

};
export {auth};