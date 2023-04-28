import express from 'express';
import { auth } from '../middlewares/auth';
import { getTodos,postTodo, updateTodo, deleteTodo } from '../controllers/todos.controllers';
 const router = express.Router();

router.use(auth);
// gets a specified users todos and posts to a specified user todos.
router
     .get('/?page=:page&limit=:limit',getTodos);
router
     .post('/',postTodo);
// deletes a particular todo and updates the content in a todos.
router
     .delete('/:todoId',updateTodo)
     .put('/:todoId',deleteTodo);
export default router;