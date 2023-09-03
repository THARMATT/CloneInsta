const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const POST = mongoose.model("POST");

// Endpoint for post

router.post("/createPost", requireLogin, (req, res) => {
    const { pic, body } = req.body;
    console.log(pic)
    if (!pic|| !body) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
console.log(req.user)
    const post = new POST({
        photo:pic,
        body,
        postedBy: req.user
    });

    try {
        post.save().then((result) => {
            return res.json({ post: result });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});


// route for 
router.get("/allposts",requireLogin,(req,res)=>{

    POST.find()
    .populate("postedBy","_id name").then(posts=>res.json(posts))
    .catch(err=>console.log(err))
})
module.exports = router;
