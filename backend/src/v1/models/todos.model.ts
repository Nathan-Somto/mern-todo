import mongoose from 'mongoose';

const TodosSchema = new mongoose.Schema({
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
        type:String
    }
});
const TodoModel = mongoose.model('Todos',TodosSchema);
export {TodoModel};
export default  TodosSchema;