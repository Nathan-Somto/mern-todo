import {Response} from 'express';
import { AuthenticatedRequest, UserToken, tokenData } from '../../../types';
import UserModel from '../models/user.model';
import { CategoriesModel } from '../models/categories.model';

//GET /api/v1/users/category/
const getCategory = async (req:AuthenticatedRequest, res:Response)=>{
    const userId = (req as UserToken).user.id;
    try{
        const user = await UserModel.findById(userId).select('categories');
        if(user !== null){

        }
    }
    catch(err){

    }
}