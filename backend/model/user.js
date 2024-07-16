const mongoose=require("mongoose")

const userShema=new mongoose.Schema({
     email:{type:String,required:true,unique:true},
     password:{type:String,required:true}
})

const User=mongoose.model("users",userShema)
module.exports=User
