import express from 'express';
import * as userController  from '../controllers/user.controllers';
import { auth } from '../middlewares/auth';
 const router = express.Router();

 router.post('/signup', userController.signUp);
 router.post('/login', userController.logIn);

 // user needs to authenticated before he or she can perform the set actions.
 router.use(auth);
 router.put('/password');
 router.delete('/');

 export default router;