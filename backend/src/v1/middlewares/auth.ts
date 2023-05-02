import 'dotenv/config';
import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../utils/statusCodes';
import { UserToken, tokenData } from '../../../types';

const auth = (req:Request,res:Response,next:NextFunction) =>{
    const token = req.headers["x-access-token"];
    if(!token){
       return res.status(statusCodes.Unauthorized).json({message:"a token is required "});
    }
   try{
   const decoded  = jwt.verify(token as string,process.env.SECRET_KEY as string);
   (req as UserToken).user  = decoded as tokenData;
   req.params = { ...req.params };
   console.log("params in  middleware: ",req.params);
   next();
   }
   catch(err){
     return res.status(statusCodes.Unauthorized).json({message:"Invalid token"});
   }

};
export {auth};