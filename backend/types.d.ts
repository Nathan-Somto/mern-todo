import { Request } from "express";
import { ObjectId, Types } from "mongoose";
interface IUser{
    firstname:string;
    password:string;
    email:string;
    categories:Types.DocumentArray<Categories>;
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
type Categories ={
    name:string;
    todos:Types.DocumentArray<Todos>
}
type Todos = {
    todo:String;
    description?:String;
    due_date?:Date;
    color:String;
    completed:boolean;
    date:Date;
}
type Optional<T>={
    [ P in keyof T]: T[P] | undefined;
}
type updatedTodoBody = Optional<Todos>;
interface UserToken extends Request{
    user:tokenData;
}
type AuthenticatedRequest = UserToken | Request;
type updatedCategoryBody = Omit<category,'todos'>;
type postCategoryBody = updatedCategoryBody;
export {
    signUp,
    logIn,
    statusCodes,
    tokenData,
    UserToken,
    AuthenticatedRequest,
    Todos,
    updatedTodoBody,
    Categories,
    updatedCategoryBody,
    postCategoryBody,
    IUser,
}