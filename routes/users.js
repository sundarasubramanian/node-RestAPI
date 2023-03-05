const express = require("express");
const router = express.Router();
const User = require("../models/User");
// Get All Route
router.get("/", async (req, res) => {
 // Rest of the code will go here
 try {
    const users = await User.find();
    res.json(users)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}); 
// Get One Route
router.get("/:id", getUser, async (req, res) => {
    res.json(res.user);
}); 
// Create One Route
router.post("/",  async (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname
      });
      try {
        const newUser = await user.save();
        res.status(201).json({ newUser });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});
// Edit One Route PUT version
router.put("/:id", getUser, async (req, res) => {
    try {
      const updatedUser = await res.user.set(req.body);
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Delete One Route
router.delete("/:id", getUser, async (req, res) => {
    try {
      await res.user.deleteOne();
      res.json({ message: "User has been deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
module.exports = router;


//getUser middleware
async function getUser(req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "Cannot find User" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
  }