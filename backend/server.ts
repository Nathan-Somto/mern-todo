import {startServer} from './src/app';
import { connectDb } from './src/v1/utils/connectDb';
connectDb();
startServer();
console.log("i am working"); 