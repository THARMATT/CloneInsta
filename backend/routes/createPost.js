const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const POST = mongoose.model("POST");

// Endpoint for post
router.post("/createPost", requireLogin, (req, res) => {
  const { pic, body } = req.body;
  console.log(pic);
  if (!pic || !body) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  console.log(req.user);
  const post = new POST({
    photo: pic,
    body,
    postedBy: req.user,
  })

  try {
    post.save().then((result) => {
      return res.json({ post: result });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route for fetching all posts
router.get("/allposts", requireLogin, (req, res) => {
  let limit=req.query.limit
  let skip = req.query.skip
  POST.find()
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name Photo")
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .sort("-createdAt")
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

// Route for displaying my posts
router.get('/myposts', requireLogin, (req, res) => {
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name Photo")
    .sort("-createdAt")
    .then(myposts => { res.json(myposts) });
});

// Like endpoint
router.put("/like", requireLogin, async (req, res) => {
  const postId = req.body.postId;

  try {
    const result = await POST.findByIdAndUpdate(
      postId,
      {
        $push: { likes: req.user._id },
      },
      { new: true } // Option to return the updated document
    ).populate("postedBy", "_id Photo name").exec();

    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Unlike endpoint
router.put("/unlike", requireLogin, async (req, res) => {
  const postId = req.body.postId;

  try {
    const result = await POST.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true } // Option to return the updated document
    ).populate("postedBy", "_id name Photo").exec();

    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Comment endpoint
router.put("/comment", requireLogin, async (req, res) => {
  const postId = req.body.postId;
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
  };

  try {
    const result = await POST.findByIdAndUpdate(postId, {
      $push: { comments: comment },
    }, {
      new: true,
    }).populate('comments.postedBy', '_id name Photo').populate("postedBy", "_id name Photo").exec();

    res.json(result);
  }
  catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Endpoint to delete a post
router.delete("/deletePost/:postId", requireLogin, async (req, res) => {
  try {
    // Find the post by ID
    const post = await POST.findOne({ _id: req.params.postId }).populate("postedBy", "_id name Photo").exec();

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user is the owner of the post
    if (post.postedBy._id.toString() === req.user._id.toString()) {
      // If yes, delete the post using the model
      await POST.deleteOne({ _id: req.params.postId });
      return res.json({ message: "Successfully deleted" });
    } else {
      return res.status(403).json({ error: "Unauthorized to delete this post" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal server error" });
  }
});

// To show following posts
router.get("/myfollowingpost", requireLogin, (req, res) => {
  POST.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name Photo").sort("-createdAt")
    .then(posts => {
      res.json(posts);
    })
    .catch(err => { console.log(err) });
});

module.exports = router;
