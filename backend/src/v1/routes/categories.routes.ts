import express from 'express';
import { auth } from '../middlewares/auth';
const router = express.Router();
router.use(auth);

router
     .get('/')
     .post('/');
router
     .put('/:categoryId')
     .delete('/:categoryId');