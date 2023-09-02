const express=require("express");
const app=express();
const cors=require("cors")
const PORT=5000;
app.use(cors())
const mongoose=require("mongoose");
const{ mongoUrl}=require("./keys");
 require('./models/model')
require('./models/post')
app.use(express.json())//middleware  
app.use(require('./routes/auth'))
app.use(require('./routes/createPost'))

mongoose.connect(mongoUrl);
mongoose.connection.on("connected",()=>{
    console.log("Successfully connected to mongodb")
})
mongoose.connection.on("error",()=>{
    console.log("failed to connect to mongodb")
})
app.listen(PORT,()=>{
    console.log("server is running on port:"+PORT)
})