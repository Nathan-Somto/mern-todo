import mongoose from 'mongoose';
import TodosSchema from './todos.model';

const CategoriesSchema = new mongoose.Schema({
    name:{type:String, unique:true, maxLength:255, required:true},
    description:{type:String},
    todos:[TodosSchema]
});
CategoriesSchema.methods.validateDescription = function ():boolean {
   
    let words = this.description;
    return words.split(' ').length >= 20;
};

const CategoriesModel = mongoose.model('Categories', CategoriesSchema);

export {CategoriesSchema, CategoriesModel};