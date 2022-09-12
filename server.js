const express = require('express');
const app = express();
const axios=require('axios');


app.use(express.json());

app.get('/todos',async(req,res)=>{
    try {
        const response=await axios.get('https://jsonplaceholder.typicode.com/todos')
        const todos=response.data;
        const result=todos.map(({id,title,completed})=>({id,title,completed}));
        res.json(result);
    } catch (error) {   
        res.json({error:error.message})
    }
});

app.get('/user/:id',async(req,res)=>{
    const {id}=req.params; 
    try {
        const todosresponse=await axios.get('https://jsonplaceholder.typicode.com/todos')

        const todoslist=todosresponse.data;
        const userresponse=await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
       const user=userresponse.data;
       user['todos']=[];
    
        for(const task of todoslist ){
            if(task.userId==user.id){user.todos.push(task)} 
        }
        res.json(user);
    } catch (error) {   
        
        res.json({error:error.message});
        
    }
});


app.listen(3000,()=>{console.log('running on port 3000')});