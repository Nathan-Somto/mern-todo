import { Response } from "express";
import {
  AuthenticatedRequest,
  UserToken,
  category,
  postCategoryBody,
  updatedCategoryBody,
} from "../../../types";
import UserModel from "../models/user.model";
import { CategoriesModel } from "../models/categories.model";
import statusCodes from "../utils/statusCodes";

/**
 * @description: gets all the available user categories, excluding the todos in the category object.
 * @param req {AuthenticatedRequest}: authenticated request that is sent by the client contains  decoded user data.
 * @param res {Response}: the response that is sent to the client.
 * @returns 
 */
//GET /api/v1/users/category/
const getCategory = async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as UserToken).user.id;
  try {
    const user = await UserModel.findById(userId).select(
      "categories._id categories.name"
    );
    if (user !== null) {
      return res.status(statusCodes.OK).json({ categories: user });
    }
  } catch (err) {
    console.error(err);
    res.status(statusCodes.Internal_Server).json({ message: 'Server error' });
  }
};
/**
 * @description: posts a new category with a name into the user categories, the name must be unique.
 * @param req {AuthenticatedRequest}: authenticated request that is sent by the client contains  decoded user data.
 * @param res {Response}: the response that is sent to the client.
 * @returns 
 */
//Post /api/v1/users/category/
const postCategory = async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as UserToken).user.id;
  const body = req.body as postCategoryBody;
  if (!body.name) {
    return res
      .status(statusCodes.Bad_Request)
      .json({ message: "name cannot be empty" });
  }
  try {
    const user = await UserModel.findById(userId);
    if (user !== null) {
      const nameExists: category | undefined = user.categories.find(
        (category) => category.name === body.name
      );
      if (nameExists !== undefined) {
        return res
          .status(statusCodes.Bad_Request)
          .json({ message: "name already exists" });
      }
      const categories = new CategoriesModel({ name: body.name });
      user.categories.push(categories);
      await user.save();
      return res
            .status(statusCodes.OK)
            .json({ categories: user.categories });
    }
  } catch (err) {
    console.error(err);
    res.status(statusCodes.Internal_Server).json({ message: 'Server error' });
  }
};
/**
 * @description: updates only the name of a specified category.
 * @param req {AuthenticatedRequest}: authenticated request that is sent by the client contains  decoded user data.
 * @param res {Response}: the response that is sent to the client.
 * @returns 
 */
//PUT /api/v1/users/category/:categoryId
const updateCategory = async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as UserToken).user.id;
  const { categoryId } = req.params;
  const body = req.body as updatedCategoryBody;
  try {
    const user = await UserModel.findById(userId);
    if (user !== null) {
        const category = user.categories.id(categoryId);
        if(category === null){
            return res
                .status(statusCodes.Not_Found)
                .json({message:`could not find a category with id of ${categoryId}` });
        }
        category.name = body.name || category.name;
        await user.save();
      return res
                .status(statusCodes.OK)
                .json({ categories: user.categories });
    }
  } catch (err) {
    console.error(err);
    res.status(statusCodes.Internal_Server).json({ message: 'Server error' });
  }
};
/**
 * @description: deletes all the content in a specified user category.
 * @param req {AuthenticatedRequest}: authenticated request that is sent by the client contains  decoded user data.
 * @param res {Response}: the response that is sent to the client.
 * @returns: a response with the document or a message.
 */
// DELETE /api/v1/users/category/:categoryId
const deleteCategory = async (req: AuthenticatedRequest, res: Response) => {
    const userId = (req as UserToken).user.id;
    const { categoryId } = req.params;
    try {
      const user = await UserModel.findById(userId);
      if (user !== null) {
        if(user.categories.length === 0){
            return res.status(statusCodes.Bad_Request).json({message:`no categories for ${user.firstname}`})
        }
          const category = user.categories.id(categoryId);
          if(category === null){
              return res.status(statusCodes.Not_Found).json({message:`could not find a category with id of ${categoryId}` });
          }
          user.categories.remove(category);
          await user.save();
        return res.status(statusCodes.OK).json({ categories: user.categories });
      }
    } catch (err) {
        console.error(err);
        res.status(statusCodes.Internal_Server).json({ message: 'Server error' });
    }
  };
export { getCategory, updateCategory, postCategory, deleteCategory };
