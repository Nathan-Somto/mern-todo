import 'dotenv/config';
import  mongoose from 'mongoose';
async function connectDb(){
    try{
    await mongoose.connect(process.env.MONGO_DB_URL as string);
    console.log("connected to mongoDb...");
    }
    catch(err){
        console.error(err);
    }
}
export {connectDb};