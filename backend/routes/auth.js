const express =require("express");
const { default: mongoose, Mongoose } = require("mongoose");
const router=express.Router();
const USER=mongoose.model("USER")
const bcrypt=require("bcrypt");
router.get('/',(req,res)=>{
    res.send("hello")
})
router.post("/signup",(req,res)=>{
   // console.log(req.body.name)
   const{name,username,email,password}=req.body;
if(!name||!email||!username||!password){
   res.status(422).json({error:"please ensure to add all fields"})
}
USER.findone({$or:[{email:email},{username:username}]}).then((savedUser)=>{
   if(savedUser){
      return res.sendStatus(422).json({error:"User already exist with same data"})
   }
})
bcrypt.hash(password,12).then((hashedPassword)=>{
   const user= new USER({
      name,
      email,
      password:hashedPassword,
      username
         })
         user.save()
         .then(user=>{res.json({message:"saved successfully"})})
})
   
   .catch(err=>console.log(err))
})
module.exports=router;