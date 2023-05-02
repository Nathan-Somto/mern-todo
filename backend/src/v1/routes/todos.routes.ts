import express from 'express';
import { auth } from '../middlewares/auth';
import { getTodos,postTodo, updateTodo, deleteTodo } from '../controllers/todos.controllers';
 const router = express.Router();
 const userTodosRoute = '/:firstname/:categoryId/';
 const pageLimitQuery = '/?page=:page&limit=:limit';
router.use(auth);
// gets a specified users todos and posts to a specified user todos.
router
     .post(`${userTodosRoute}`,postTodo);
router
     .get(`${userTodosRoute}${pageLimitQuery}`,getTodos);

// deletes a particular todo and updates the content in a todos.
router.route(`${userTodosRoute}:todoId`)
     .put(updateTodo)
     .delete(deleteTodo);
export default router;