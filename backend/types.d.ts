import { Request } from "express";
import { ObjectId } from "mongoose";
interface IUser{
    firstname:string;
    password:string;
    email:string;
};
type signUp = IUser;
type logIn = Omit<IUser, 'firstname'>;

type statusCodes =Readonly<{
    OK: 200,
    Created:201,
    Bad_Request:400,
    Unauthorized:401,
    Forbidden:403,
    Not_Found:404,
    Internal_Server:500
}>
type tokenData =
{
    id:ObjectId,
    firstname:string
}
interface UserToken extends Request{
    user:tokenData /* | JwtPayload */;
}
type AuthenticatedRequest = UserToken | Request;
export {
    signUp,
    logIn,
    statusCodes,
    tokenData,
    UserToken,
    AuthenticatedRequest,
}