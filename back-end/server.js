const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./db/dbConnection');
const User = require('./db/user');

//middleware
app.use(express.json());

//Registration
app.post('/register', async(req, res)=> {
    try{
        const {username, password} = req.body;
        const user = new User({username, password});
        await user.save();
        res.status(201).json({message: 'Registration successful'});
    }catch(e){
        res.status(500).json({message: e});
    }
});

//Login
app.post('/login', async(req, res)=> {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({error: 'invalid username or password'})
        }

        if(user.password !== password){
            return res.status(401).json({error: 'invalid username or password'})
        }
        res.status(200).json({message: 'login successful'})

    }catch(e){
        res.status(500).json({error: e})
    }
})

connectDB();

app.listen(port, ()=> {
    console.log(`server is running at ${port}`);
})