import express from 'express';
import statusCodes from '../utils/statusCodes';
const router = express.Router();

router.use((req,res)=>{
    res.status(statusCodes.Not_Found).json({message:"the resource does not exist"});
});

export default router;