const mongoose=require('mongoose')


const userSchema=mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
})

const channelSchema=mongoose.Schema({
  channelname: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})


const userModel=mongoose.model('users',userSchema)
const channelModel=mongoose.model('channels',channelSchema)

module.exports={
    userModel,channelModel
}