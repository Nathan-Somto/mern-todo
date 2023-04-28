import 'dotenv/config';
import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../utils/statusCodes';
import { UserToken, tokenData } from '../../../types';

const auth = (req:Request,res:Response,next:NextFunction) =>{
    const token = req.headers["X-Auth"];
    if(!token){
       return res.status(statusCodes.Unauthorized).json({message:"a token is required "});
    }
   const decoded  = jwt.verify(token as string,process.env.SECRET_KEY as string);
   (req as UserToken).user  = decoded as tokenData;
   next();

};
export {auth};