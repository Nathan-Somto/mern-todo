import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { CategoriesSchema } from "./categories.model";

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String, 
        required:true,
    },
    password:{
        type:String,
        minLength:8,
        required:true, 
        maxLength:255
        },
    email:{
        type:String,
        unique:true,
        required:true, 
        lowercase:true
    },
    categories:[CategoriesSchema],
});

// hashes the password before it is saved to the mongodb database.
UserSchema.pre('save',async function(){
    try{
    let salt =  await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    }
    catch(err){

    }

});
const UserModel = mongoose.model('users',UserSchema);

export default UserModel;