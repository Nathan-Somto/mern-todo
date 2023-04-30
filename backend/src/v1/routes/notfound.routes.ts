import express from 'express';
import statusCodes from '../utils/statusCodes';
const router = express.Router();

router.use((req,res)=>{
    const body = req.body;
     console.log(body);
    res.status(statusCodes.Not_Found).json({message:"the resource does not exist"});
});

export default router;