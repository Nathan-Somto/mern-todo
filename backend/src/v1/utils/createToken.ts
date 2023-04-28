import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { tokenData } from '../../../types';
const maxAge = 7 * 24 * 60 * 60;
let createToken = (tokenData:tokenData)=>{
  return  jwt.sign(tokenData, process.env.SECRET_KEY as string,{
        expiresIn: maxAge
    })
};
export default createToken;