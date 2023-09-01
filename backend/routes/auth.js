const express = require("express");
const { default: mongoose, Mongoose } = require("mongoose");
const router = express.Router();
const USER = mongoose.model("USER")
const bcrypt = require("bcrypt");


//Endpoint for signup
router.post("/signup", (req, res) => {
   const { name, userName, email, password } = req.body;

   //check if any fiels are missing
   if (!name || !email || !userName || !password) {
    return  res.status(422).json({ error: "please ensure to add all fields" })
   }

   //check wheter user already exists
   USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then((savedUser) => {
      if (savedUser) {
         return res.status(422).json({ error: "User already exists" })
      }

      //hash the password
      bcrypt.hash(password, 12).then((hashedPassword) => {

         //create new user
         const user = new USER({
            name,
            email,
            password: hashedPassword,
            userName
         })

         //save the user
         user.save()
            .then(user => { res.json({ message: "Signup successfully" }) })
      })

         .catch(err => console.log(err))
   })
})

//End point to signin

router.post("/signin",(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
      return res.status(422).json({error:"Please SignUp with Correct Credentials"})
    }
    USER.findOne({email:email}).then((savedUser)=>{

if(!savedUser){
   return res.status(422).json({error:"Invalid Credentials"})
}

bcrypt.compare(password,savedUser.password)
.then((match)=>{if(match){
   return res.status(200).json({message:"Signin Successfully"})
}
else{
   return res.status(422).json({error:"Invalid Credentials"})
}}).catch(err=>console.log(err))
    })
})

module.exports = router;