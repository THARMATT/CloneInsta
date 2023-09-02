const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const POST = mongoose.model("POST");

// Endpoint for post

router.post("/createPost", requireLogin, (req, res) => {
    const { title, body } = req.body;
    
    if (!title || !body) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
console.log(req.user)
    const post = new POST({
        title,
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

module.exports = router;
