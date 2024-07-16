const router=require("express").Router()
const bcrypt=require("bcryptjs")
const User = require("../model/user")
router.post('/signup',async(req,res)=>{
    const {email,password,confirmPassword}=req.body
   try {
    
    let hashPassword= await bcrypt.hash(password,10)

    let user = await new User({email,password:hashPassword})
    await user.save()
    res.status(200).send({message:"signup success"})
   } catch (error) {
    console.log(error);
    
   }  
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body
   try {
    
     const user = await User.findOne({email})
    if(!user){res.status(401).send("invalid email")}
    const cPassword= await bcrypt.compare(password,user.password)
    if(!cPassword) {res.status(401).send("invalid password")}


    res.status(200).send({status:true,message:"Login success"})
   } catch (error) {
    console.log(error);
    
   }  
})
module.exports=router