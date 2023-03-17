const express = require("express");
const router = express.Router();

const User = require("../models/Users");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can updat you id only");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST

router.delete("/:id",async(req,res)=>{
 try {
    const post = await Post.findById(req.params.id);
    if(post.username === req.body.username)
    {
        try {
            await post.delete();
            res.status(200).json("Post Has been deleted ...");
        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("you can delete your data");
    }
 } catch (err) {
    res.status(500).json(err);
 }
})

//Get Single Post

router.get("/:id",async(req,res)=>{
 try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post)
 } catch (err) {
    res.status(500).json(err);
    
 }
})

//Get ALl Post
router.get("/", async(req,res)=>{

  try {
    const posts= await Post.find();
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json("failed with backedn error");
    
  }

})
module.exports = router;
