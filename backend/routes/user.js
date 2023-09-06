const express = require("express");
const mongoose = require("mongoose");
const USER = mongoose.model("USER")
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const POST = mongoose.model("POST");
//End point to get user profile
router.get("/user/:id", async (req, res) => {

    try {
        const user = await USER.findOne({ _id: req.params.id })
            .select("-password")
        const post = await POST.find({ postedBy: req.params.id })
            .populate("postedBy", "_id").populate("comments.postedBy", "_id name Photo")
            .exec();
        res.status(200).json({ user: user, post: post });
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }

})


// Endpoint to follow a user
router.put("/follow", requireLogin, async (req, res) => {
    try {
      // Use Promise.all to update both user documents concurrently
      const [followedUser, followingUser] = await Promise.all([
        USER.findByIdAndUpdate(
          req.body.followId,
          {
            $push: { followers: req.user._id }
          },
          { new: true }
        ),
        USER.findByIdAndUpdate(
          req.user._id,
          {
            $push: { following: req.body.followId }
          },
          { new: true }
        )
      ]);
  
      // Respond with the updated user documents
      res.json({ followedUser, followingUser });
    } catch (error) {
      res.status(422).json({ error: error.message });
    }
  });
  

//to unfollow
// Endpoint to follow a user
router.put("/unfollow", requireLogin, async (req, res) => {
    try {
      // Use Promise.all to update both user documents concurrently
      const [followedUser, followingUser] = await Promise.all([
        USER.findByIdAndUpdate(
          req.body.followId,
          {
            $pull: { followers: req.user._id }
          },
          { new: true }
        ),
        USER.findByIdAndUpdate(
          req.user._id,
          {
            $pull: { following: req.body.followId }
          },
          { new: true }
        )
      ]);
  
      // Respond with the updated user documents
      res.json({ followedUser, followingUser });
    } catch (error) {
      res.status(422).json({ error: error.message });
    }
  });
  

  //upload profile
router.put("/uploadprofilepic", requireLogin, async (req, res) => {
  try {
    const data = await USER.findByIdAndUpdate(
      req.user._id,
      { $set: { Photo: req.body.pic } },
      { new: true }
    ).exec();

    if (!data) {
      // Handle the case where the user with req.user._id is not found
      return res.status(404).json({ error: "User not found" });
    }

    res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});
  


module.exports = router;