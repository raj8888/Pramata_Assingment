const express = require('express');
const bcrypt=require("bcrypt");
const {userModel,channelModel}=require("../models/models")
const userRouter=express.Router();
var jwt = require('jsonwebtoken');

userRouter.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
      let data= await userModel.findOne({username:username})
      if(data){
        res.status(401).send({ message: 'User already Present.' });
      }else{
        bcrypt.hash(password, 5,async function(err, hash) {
            if(err){
                res.status(401).send({ message: 'User already Present.' });
            }else if(hash){
                const newUser = new userModel({ username, password: hash });
                await newUser.save();
                res.status(201).send({ message: 'User created successfully.' });
            }else{
                res.status(401).send({ message: 'User already Present.' });
            }
        }); 
      }
    } catch (error) {
      console.log(error.message)
      res.status(401).send({ message: 'Server Error' });
    }
    
  });
  
  userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
   try {
      const user = await userModel.findOne({ username });
      if (!user) {
          return res.status(404).send({ message: 'User not found.' });
      }else{
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
              return res.status(401).send({ message: 'Invalid password.' });
          }else{
            let token=jwt.sign({userId:user._id},"masai")
              res.send({ userId: user._id,username:user.username ,token:token});
          }
      }
   } catch (error) {
      console.log(error.message)
      res.status(401).send({ message: 'Server Error' });
   }
  });


  module.exports={
    userRouter
  }