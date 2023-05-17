import express from 'express';
import { auth } from '../middlewares/auth';
import { updateCategory,postCategory,deleteCategory,getCategory } from '../controllers/categories.controllers';
const router = express.Router();
//auth middleware
router.use(auth);

router
     .get('/',getCategory)
     .post('/',postCategory);
router
     .put('/:categoryId',updateCategory)
     .delete('/:categoryId',deleteCategory);
export default router;