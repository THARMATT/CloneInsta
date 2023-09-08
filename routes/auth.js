const express = require("express");
const { default: mongoose, Mongoose } = require("mongoose");
const router = express.Router();
const USER = mongoose.model("USER")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys")
const requireLogin = require('../middlewares/requireLogin')





//Endpoint for signup
router.post("/signup", (req, res) => {
   const { name, userName, email, password } = req.body;

   //check if any fiels are missing
   if (!name || !email || !userName || !password) {
      return res.status(422).json({ error: "please ensure to add all fields" })
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

router.post("/signin", (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(422).json({ error: "Please SignUp with Correct Credentials" })
   }
   USER.findOne({ email: email }).then((savedUser) => {

      if (!savedUser) {
         return res.status(422).json({ error: "Invalid Credentials" })
      }

      bcrypt.compare(password, savedUser.password)
         .then((match) => {
            if (match) {
               //
               const token = jwt.sign({ _id: savedUser.id }, Jwt_secret)
               const { name, _id, email, userName } = savedUser
               console.log({ token, user: { _id, name, email, userName } })
               return res.status(200).json({ token, user: { _id, name, email, userName } })
            }
            else {
               return res.status(422).json({ error: "Invalid Credentials" })
            }
         }).catch(err => console.log(err))
   })
})


//end point for authentication 
router.post("/googleLogin", (req, res) => {
   const { email_verified, email, name, clientId, userName, Photo } = req.body;
   if (email_verified) {
      USER.findOne({ email: email }).then((savedUser) => {

         if (savedUser) {
            const token = jwt.sign({ _id: savedUser.id }, Jwt_secret)
            const { name, _id, email, userName } = savedUser
            console.log({ token, user: { _id, name, email, userName } })
            return res.status(200).json({ token, user: { _id, name, email, userName } })
         }
         else {
            const password = email + clientId;
            const user = new USER({
               name,
               email,
               password: password,
               userName,
               Photo

            })

            //save the user
            user.save()
               .then(user => {
                  let userId = user._id.toString()
                  const token = jwt.sign({ _id: user.id }, Jwt_secret)
                  const { name, _id, email, userName } = user;
                  console.log({ token, user: { _id, name, email, userName } })
                  return res.status(200).json({ token, user: { _id, name, email, userName } })
               }).catch(err=>{console.log("this error")})

            }


      })
   }
})
module.exports = router;