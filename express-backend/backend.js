// backend.js
import express from "express";

const app = express();
const port = 8000;



const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}


app.use(express.json());


app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; 
    removeUserById(id);
    res.status(200).end(); 
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined || job != undefined){
        let result = findUserByName(name,job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});


app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function removeUserById(id){
    const index = users['users_list'].findIndex(entry => entry.id === id);
    users['users_list'].splice(index,1);
}

function addUser(user){
    users['users_list'].push(user);
}



function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name,job) => { 
    if (job != undefined){
        return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job);
    }
    else{
        return users['users_list'].filter( (user) => user['name'] === name);
    } 
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      
