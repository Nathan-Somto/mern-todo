import mongoose,{Model} from 'mongoose';
import { Todos } from '../../../types';
interface ITodosMethods{
    validateDescription():boolean;
}
type TodoModel = Model<Todos, {}, ITodosMethods>;
const TodosSchema = new mongoose.Schema<Todos,TodoModel,ITodosMethods>({
    todo:{
        type:String, 
        minlength:1, 
        required:true
    },
    completed:{
        type:Boolean,
        required:true,
        default:false
    },
    date:{
        type:Date,
        default:Date.now()
    },
    color:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    due_date: {
        type:Date,
    }
});
TodosSchema.methods.validateDescription = function ():boolean {
   if(this.description === undefined) return true;
    let words = this.description;
    return words.split(' ').length >= 40;
};
const TodoModel = mongoose.model<Todos, TodoModel>('Todos',TodosSchema);
export {TodoModel};
export default  TodosSchema;