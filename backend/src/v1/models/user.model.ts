import mongoose, { Model } from "mongoose";
import bcrypt from 'bcrypt';
import { CategoriesSchema } from "./categories.model";
import { IUser } from "../../../types";
interface IUserMethods{
    comparePassword(publicPassword:string):Promise<boolean>;
}
type UserModel = Model<IUser, {}, IUserMethods>;
const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
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
// Password compare method
/**
 * 
 * @param publicPassword the  password that is passed as a request to be compared with the hashed in db.
 * @returns boolean
 */
UserSchema.methods.comparePassword =  async function(publicPassword:string){
  const isPassword =  await bcrypt.compare(this.password, publicPassword);
  return isPassword;
}
// hashes the password before it is saved to the mongodb database.
UserSchema.pre('save',async function(){
    try{
    let salt =  await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    }
    catch(err){

    }

});
const UserModel = mongoose.model<IUser, UserModel>('users',UserSchema);

export default UserModel;