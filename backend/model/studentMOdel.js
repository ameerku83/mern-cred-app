const mongoose=require("mongoose")

const studentschema=new mongoose.Schema({
 name:String,
 age:Number,
 address:String
})

const Student = mongoose.model('Student', studentschema);
module.exports=Student