import { Response } from "express";
import { TodoModel } from "../models/todos.model";
import UserModel from "../models/user.model";
import statusCodes from "../utils/statusCodes";
import { AuthenticatedRequest, UserToken,Todos, updatedTodoBody } from "../../../types";

// entry point for the todo controllers.


/**
 * @description : gets a paginated lists of todos under a specified category from the database.
 * @param req :(UserToken | Requsest): the request object that contains the decoded user info.
 * @param res 
 * @returns the page and limit set for the todos.
 */
// GET  users/:firstname/:categoryId/todos/?page=:page&limit=:limit

let getTodos = async (req:AuthenticatedRequest, res:Response)=>{
    const userId = (req as UserToken).user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const categoryId = req.params.categoryId;
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const category = user.categories.id(categoryId);
      if (category === null){
        return res
        .status(statusCodes.Bad_Request)
        .json({message:"the category does not exists"})
   }
    const { name} = category;
      const totalTodos = category.todos.length;
      const totalPages = Math.ceil(totalTodos / limit);
      if(page > totalPages){
        return res.status(statusCodes.Not_Found).json(
            {
            name, 
            categoryId, 
            currentPage:page,
            totalPages, 
            todos:[]
        })
      }
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const todos = category.todos.slice(startIndex, endIndex);
  
      const response = {
        name,
        categoryId,
        currentPage: page,
        totalPages: Math.ceil(category.todos.length / limit),
        todos
      };
  
      res.status(statusCodes.OK).json(response);
    } catch (err) {
      console.error(err);
      res.status(statusCodes.Internal_Server).json({ message: 'Server error' });
    }
}

/**
 * @description : posts a new todo to the database under  a specified user category.
 * @param req :(UserToken | Requsest): the request object that contains the decoded user info.
 * @param res 
 * @returns if successful returns the newly updated user todo array
 */

// POST  users/:firstname/:categoryId/todos

let postTodo = async (req:AuthenticatedRequest, res:Response)=>{
    const userId = (req as UserToken).user.id;
    console.log(req.params);
    const categoryId = req.params.categoryId;
    const body = req.body as Todos;
    if(!req.body.todo && !req.body.color){
         return res.status(statusCodes.Bad_Request).json({message:"missing todo, completed and color"});
    }
    const {completed, todo, color,due_date} = body;
    const description = body.description ?? undefined;
    try{
        let user = await UserModel.findById(userId);
        if(user !== null)
        {
            console.log(user);
            console.log(categoryId);
            const Category = user.categories.id(categoryId);
            console.log(Category);
            let newTodo = new TodoModel({completed,todo,color,description,due_date});
            if(!newTodo.validateDescription()){
                console.log(description);
                return res.status(statusCodes.Bad_Request).json({message:"description cannot be longer than 40 words"});
            }
            if (Category === null){
                 return res
                 .status(statusCodes.Bad_Request)
                 .json({message:"the category does not exists"})
            }
            Category.todos.push(newTodo);
            await user.save();
            res.status(statusCodes.OK).json({todos:Category.todos});
        }
        else{
            throw new Error("internal server error");
        }
    }
    catch(err){
        console.error(err);
        res.status(statusCodes.Internal_Server).json({ message: 'Server error' });
    }

}
// PUT
/**
 * @description : updates certain fields in the todo object under a specified category.
 * @param req :(UserToken | Requsest): the request object that contains the decoded user info.
 * @param res 
 * @returns if successful returns the newly updated user todo array
 */

// PUT /api/v1/users/:firstname/:categoryId/todos/:todoId

let updateTodo = async (req:AuthenticatedRequest, res:Response) => {
    let userId = (req as UserToken).user.id;
    const {categoryId, todoId} = req.params;
    const body = req.body as updatedTodoBody;
    console.log("update todo params ", req.params);
    try{
        let user = await UserModel.findById(userId);
        if(user !== null){
        const category = user.categories.id(categoryId);
        if(category === null){
            return res
            .status(statusCodes.Bad_Request)
            .json({message:"the category does not exists"})
        }
        const foundTodo = category.todos.id(todoId);
        if(foundTodo === null){
            return res.status(statusCodes.Not_Found).json({message:"the todo was not found"});
        }
        foundTodo.completed = body.completed || foundTodo.completed;
        foundTodo.color = body.color || foundTodo.color;
        foundTodo.todo = body.todo || foundTodo.todo;
        foundTodo.due_date = body.due_date || foundTodo.due_date;
        foundTodo.description = body.description || foundTodo.description;
        await user.save();
    res.status(statusCodes.OK).json({...category.todos ,categoryId});
        }
    }
    catch(err){
        console.error(err);
        res.status(statusCodes.Internal_Server).json({ message: 'Server error' });
    }
}

/**
 * @description : deletes a user specified todo.
 * @param req :(UserToken | Requsest): the request object that contains the decoded user info.
 * @param res 
 * @returns if successful returns the newly updated user todo array
 */

// Delete /api/v1/users/:firstname/:categoryId/todos/:todoId

let deleteTodo = async (req:AuthenticatedRequest, res:Response)=>{
    let userId = (req as UserToken).user.id;
   const {todoId, categoryId} = req.params;
    try{
        const user = await UserModel.findById(userId);
        if(user !== null){
            const Category = user.categories.id(categoryId);
            if (Category === null){
                return res
                .status(statusCodes.Bad_Request)
                .json({message:"the category does not exists"})
           }
            const todos = Category.todos;
            if(!todos.length){
                return res.status(statusCodes.Bad_Request).json({message:"user todo list is empty"});
            }
            const todo = todos.id(todoId);
            if (todo === null){
                return res.status(statusCodes.Not_Found).json({message:"the todo was not found"});
            }
            todos.remove(todo);
            await user.save();
            res.status(statusCodes.OK).json({...todos, categoryId});
        }
    }
    catch(err){
        console.error(err);
        res.status(statusCodes.Internal_Server).json({ message: 'Server error' });
    }

}

export {getTodos, postTodo, updateTodo, deleteTodo};