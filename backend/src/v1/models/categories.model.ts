import mongoose from 'mongoose';
import TodosSchema from './todos.model';

const CategoriesSchema = new mongoose.Schema({
    name:{type:String, unique:true, maxLength:255, required:true},
    todos:[TodosSchema]
});


const CategoriesModel = mongoose.model('Categories', CategoriesSchema);

export {CategoriesSchema, CategoriesModel};