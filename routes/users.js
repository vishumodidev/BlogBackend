const express = require('express');
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const { route } = require('./auth');
//Update

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      },{new:true});
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("you are Update only your account");
  }
});

//Delete

router.delete("/:id",async(req,res)=>{
  if(req.body.userId === req.params.id)
  {   try {
       const user= await User.findById(req.params.id)
      try {
        await Post.deleteMany({username:user.username});
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }catch(err){
    res.status(401).json("you are not authoriesd")
  }
  }else{
    res.status(401).json("you can delete you only account")
  }

})


//Get User 
router.get("/:id", async(req,res)=>{
  try {
    
    const user= await User.findById(req.params.id);
    const {password, ...others}= user._doc;
  res.status(201).json(others);
  } catch (err) {
    res.status(500).json(err);
  }

})

module.exports=router;