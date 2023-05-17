import 'dotenv/config';
import express from 'express';
import cors from 'cors';
/* import v1 from './v1/routes/v1.routes'; */
import users from './v1/routes/user.routes';
import todos from './v1/routes/todos.routes';
import categories from './v1/routes/categories.routes';
import notfound from './v1/routes/notfound.routes';

const app = express();

app.use(cors());
app.use(express.json());

// port for server
const PORT = process.env.PORT ||  8000;

// routes
//app.use('/api/v1',v1);
app.use('/api/v1/users',users);
app.use('/api/v1/users/categories',categories);
app.use('/api/v1/users/todos',todos);


// catch all route
app.use(notfound);

// start server function, when run listens to request.
 function startServer(){
    app.listen(PORT,()=>{
        console.log(`server started at http://localhost:${PORT}`);
    });
 }

export {startServer};