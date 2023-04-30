import express from 'express';
import {signUp, logIn, deleteUser, updatePassword} from '../controllers/user.controllers';
import { auth } from '../middlewares/auth';
 const router = express.Router();

 router.post('/signup', signUp);
 router.post('/login', logIn);

 // user needs to authenticated before he or she can perform the set actions.
 router.use(auth);
 router.put('/password',updatePassword);
 router.delete('/',deleteUser);

 export default router;