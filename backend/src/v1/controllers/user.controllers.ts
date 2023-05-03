import { Request,Response } from "express";
import {ObjectId} from 'mongoose';
import UserModel from "../models/user.model";
import { logIn, signUp } from "../../../types";
import statusCodes from "../utils/statusCodes";
import createToken from "../utils/createToken";
import { UserToken } from "../../../types";

let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
/**
 * @access Public
 * @method POST
 * @param req 
 * @param res 
 * @returns 
 */
let signUp = async (req:Request,res:Response)=>{
   const {
      firstname,
      email,
      password,
   } = req.body as signUp;
if(!(firstname && email && password)){
   return res
             .status(statusCodes.Bad_Request)
             .json({message:"missing email, password and firstname"});
}
if(!(emailPattern.test(email))){
   return res
             .status(statusCodes.Bad_Request)
             .json({message:"invalid email"});
}
try{                                

let foundEmail = await UserModel.findOne({email});
if(foundEmail){
   return res
             .status(statusCodes.Bad_Request)
             .json({message:"a user already exists with the given email"});
}
const user = new UserModel(
   {
   firstname,
   password,
   email,
});
const token = createToken(
   {
   firstname,
   id:user._id as unknown  as ObjectId,
});
await user.save();
res
    .status(statusCodes.OK)
    .json({accessToken:token});

}
catch(err){
      console.error(err);
}
};
/**
 * @access Public
 * @method POST
 * @param req 
 * @param res 
 * @returns 
 */
let logIn = async  (req:Request,res:Response)=> {
   const {email, password} = req.body as logIn;
   if(!(email && password)){
      return res
              .status(statusCodes.Bad_Request)
              .json({message:"missing email and password"});
   }
   try{
      let foundUser = await UserModel.findOne({email});
      if(foundUser === null){
         return res
                 .status(statusCodes.Bad_Request)
                 .json({message:"incorrect email or password"});
      }
      let decrytedPassword = await foundUser.comparePassword(password);
      if(!decrytedPassword){
         return res
                 .status(statusCodes.Bad_Request)
                 .json({message:"incorrect email or password"});
      }
      const token = createToken({firstname:foundUser.firstname, id:foundUser._id as unknown as ObjectId});
      res
          .status(statusCodes.OK)
          .json({accessToken:token});
   }
   catch(err){
         return res
                 .status(500)
                 .json({message:'there was an error'});
   }
};
/**
 * @access Private
 * @method PUT
 * @param req 
 * @param res 
 * @returns 
 */
let updatePassword = async (req:UserToken | Request, res:Response)=>{
 const userId = (req as UserToken).user.id;
 const {oldPassword, newPassword} = req.body;
 if(newPassword.length < 8){
   return res.status(statusCodes.Bad_Request).json({message:"new password length cannot be less than eight"});
 }
 try{
   let foundUser = await UserModel.findById(userId);
   if(foundUser !== null){
      let decrytedPassword = await foundUser.comparePassword(oldPassword);
      if(!decrytedPassword){
         return res
                 .status(statusCodes.Bad_Request)
                 .json({message:"the old password passed is incorrect"});
      }
      foundUser.password = newPassword;
      await foundUser.save();
      res.status(statusCodes.OK).json({message:"successfully changed the user's password"});
   }
 }
 catch(err){

 }
};
/**
 * @access Private
 * @method DELETE
 * @param req 
 * @param res 
 */
let deleteUser = async (req:UserToken | Request, res:Response)=>{
   const userId = (req as UserToken).user.id;
   try{
        let deletedAccount = await UserModel.findByIdAndDelete(userId);
        return res.status(statusCodes.OK).json({message:`successfully deleted ${deletedAccount?.firstname} account :(`});
   }
   catch(err){
      console.error(err);
     return  res.status(statusCodes.Internal_Server).json({message:`failed to delete account :)`});
   }
}
export {logIn,signUp,updatePassword, deleteUser};