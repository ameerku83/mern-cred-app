const mongoose=require("mongoose")

const itemschema=new mongoose.Schema({
 name:String,
 age:Number,
 image:String
})

const Item = mongoose.model('Item', itemschema);
module.exports=Item