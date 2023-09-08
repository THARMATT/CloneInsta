const express = require("express");
const app = express();
const cors = require("cors")
const PORT = process.env.port || 5000;
app.use(cors())
const path = require('path');
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
require('./models/model')
require('./models/post')
app.use(express.json())//middleware  
app.use(require('./routes/auth'))
app.use(require('./routes/createPost'))
app.use(require('./routes/user'))

mongoose.connect(mongoUrl);
mongoose.connection.on("connected", () => {
    console.log("Successfully connected to mongodb")
})
mongoose.connection.on("error", () => {
    console.log("failed to connect to mongodb")
})

//serving the frontend
app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, './frontend/build/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(PORT, () => {
    console.log("server is running on port:" + PORT)
})