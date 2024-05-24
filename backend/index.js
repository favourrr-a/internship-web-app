const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3001;
const cors = require ("cors");
var bcrypt = require("bcrypt")
const User = require('./models/userModel.js');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/users-info', {
}).then(() => {
    console.log("Successfully connected to MongoDB.");
})
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
        throw err;
    });

app.listen(port, () => {
    console.log(`server is running at port http://localhost:${port}`)
});

app.get('/', (req, res) => {
    res.json("hello world")
});

//login
app.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({responseCode: '100', responseMessage: 'Enter both username and password'});
        }
        else{
            const username = req.body.username;
            const password = req.body.password;
            const user = await User.findOne({username: username});
            if(user){
                var correctPassword = bcrypt.compareSync(password, user.password);
                if(!correctPassword){
                    return res.status(401).json({responseCode: "303", responseMessage: "Incorrect password"});
                }
                else{
                    res.status(200).json({responseCode: "200", responseMessage: "Login successful", responseData: {user}});
                }
            }
            else{
                res.status(404).json({responseCode: "300", responseMessage: "User details not found"});
            }
        }
    }
    catch(error){
        res.status(500).json({ responseCode: '101', responseMessage: 'fatal error'})
    }
});


//signup
app.post('/signup', async(req, res) => {
    try{
        const {username, fullName, password, password2, email} = req.body;
        const existingUser = await User.findOne({username});
        if(!existingUser){
            if(password == password2){
                const newUser = new User({username, fullName, password: bcrypt.hashSync(password, 8), email});
                await newUser.save();
                res.status(201).json({responseCode: '102', responseMessage: 'User created successfully'});
            }
            else{
                res.status(400).json({responseCode: '107', responseMessage: 'Passwords do not match'})
            }
        }
        else{
            res.status(409).json({responseCode: '105', responseMessage: 'User already exists in the database'})
        }
    }
    catch(error){
        res.status(500).json({responseCode: '103', responseMessage: 'fatal error'})
    }
})