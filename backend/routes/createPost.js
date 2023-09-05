const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const POST = mongoose.model("POST");

// Endpoint for post

router.post("/createPost", requireLogin, (req, res) => {
  const { pic, body } = req.body;
  console.log(pic)
  if (!pic || !body) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  console.log(req.user)
  const post = new POST({
    photo: pic,
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


// route for fetching all posts
router.get("/allposts", requireLogin, (req, res) => {

  POST.find()
    .populate("postedBy", "_id name").populate("comments.postedBy","_id name").then(posts => res.json(posts))
    .catch(err => console.log(err))
})

//route for displaying  mypost
router.get('/myposts', requireLogin, (req, res) => {
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then(myposts => { res.json(myposts) })
})
//like endpoint
router.put("/like", requireLogin, async (req, res) => {
  const postId = req.body.postId;

  try {
    const result = await POST.findByIdAndUpdate(
      postId,
      {
        $push: { likes: req.user._id },
      },
      { new: true } // Option to return the updated document
    ).exec();

    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});


//unlike endpoint
router.put("/unlike", requireLogin, async (req, res) => {
  const postId = req.body.postId;

  try {
    const result = await POST.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true } // Option to return the updated document
    ).exec();

    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

//COMMENT 
router.put("/comment", requireLogin, async (req, res) => {
  const postId = req.body.postId;
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id
  }
  try {
    const result = await POST.findByIdAndUpdate(postId, {
      $push: { comments: comment },
    }, {
      new:true
    }) .populate('comments.postedBy', '_id name').populate("postedBy", "_id,name").exec();
    res.json(result);
  }
  catch (error) {
    res.status(422).json({ error: error.message });
  }
})


module.exports = router;
