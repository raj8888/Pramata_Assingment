const express = require('express');
const {userModel,channelModel}=require("../models/models")
const channelRouter=express.Router();
const{authenticate}=require("../middleware/authentication.middleware")


// channelRouter.use(authenticate)
channelRouter.get("/allchannel",async(req,res)=>{
    const data=await channelModel.find()
    if(data.length==0){
        res.status(401).send({ "message": "No channel is there."});
    }else{
        res.status(201).send({ allchannel: data});
    }
})

channelRouter.get("/channel/:id",async(req,res)=>{
  let id=req.params.id
  const data=await channelModel.findById({_id:id})
  res.status(201).send({ channel: data});
})

channelRouter.post('/channels', async (req, res) => {
    const { channelname, userId } = req.body;
    const channel = await channelModel({ channelname:channelname, users: [userId] });
    await channel.save();
    res.status(201).send({ channelId: channel._id,channelname:channelname });
  });
  
  channelRouter.post('/channels/addUser', async (req, res) => {
    const { channelId, userId } = req.body;
    const channel = await channelModel.findById(channelId);
    if (!channel) {
      return res.status(404).send({ message: 'Channel not found.' });
    }
    channel.users.push(userId);
    await channel.save();
    res.send({ message: 'User added to the channel successfully.' });
  });

  module.exports={
    channelRouter
  }