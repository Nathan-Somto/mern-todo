import express from 'express';
import statusCodes from '../utils/statusCodes';
const router = express.Router();

router.use('/',(req,res)=>{
    res.status(statusCodes.OK).json({message:"welcome to version 1 of my simple todo api"})
});

export default router;