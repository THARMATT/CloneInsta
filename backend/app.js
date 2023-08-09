const express=require("express");
const app=express();
const PORT=5000;
const mongoose=require("mongoose");
const mongourl=require("./keys");
 require('./models/model')
app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(mongourl);
mongoose.connection.on("connected",()=>{
    console.log("Successfully connected to mongodb")
})
mongoose.connection.on("error",()=>{
    console.log("failed to connect to mongodb")
})
app.listen(PORT,()=>{
    console.log("server is running on port:"+PORT)
})