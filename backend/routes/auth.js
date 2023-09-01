const express = require("express");
const { default: mongoose, Mongoose } = require("mongoose");
const router = express.Router();
const USER = mongoose.model("USER")
const bcrypt = require("bcrypt");


//Endpoint for signup
router.post("/signup", (req, res) => {
   const { name, username, email, password } = req.body;

   //check if any fiels are missing
   if (!name || !email || !username || !password) {
      res.status(422).json({ error: "please ensure to add all fields" })
   }

   //check wheter user already exists
   USER.findOne({ $or: [{ email: email }, { username: username }] }).then((savedUser) => {
      if (savedUser) {
         return res.status(422).json({ error: "User already exist with same data" })
      }

      //hash the password
      bcrypt.hash(password, 12).then((hashedPassword) => {

         //create new user
         const user = new USER({
            name,
            email,
            password: hashedPassword,
            username
         })

         //save the user
         user.save()
            .then(user => { res.json({ message: "saved successfully" }) })
      })

         .catch(err => console.log(err))
   })
})

module.exports = router;