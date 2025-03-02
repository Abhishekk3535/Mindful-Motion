const express = require("express");
const Asana = require("../models/Asana");
const authMiddleware = require("../middleware/authMiddleware");

const User = require("../models/User");

const router = express.Router();

// Function to assign badges
const getBadges = (asanaCount) => {
    const badges = [];
    if (asanaCount >= 10) badges.push("Beginner Yogi");
    if (asanaCount >= 30) badges.push("Intermediate Yogi");
    if (asanaCount >= 50) badges.push("Advanced Yogi");
    if (asanaCount >= 100) badges.push("Master Yogi");
    return badges;
};

// Log an Asana
router.post("/log", authMiddleware, async (req, res) => {
    try {
      const { name, difficulty } = req.body;
      if (!name || !difficulty) return res.status(400).json({ message: "All fields are required" });
  
      const newAsana = new Asana({ name, difficulty, user: req.user.id });
      await newAsana.save();
  
      // Update user's asana count and badges
      const user = await User.findById(req.user.id);
      user.asanaCount += 1;
      user.badges = getBadges(user.asanaCount);
      await user.save();
  
      res.status(201).json({ message: "Asana logged successfully", asanaCount: user.asanaCount, badges: user.badges });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });

// Get User's Logged Asanas
router.get("/my-asanas", authMiddleware, async (req, res) => {
  try {
    const asanas = await Asana.find({ user: req.user.id }).sort({ date: -1 });
    res.json(asanas);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Community Asanas
router.get("/community", authMiddleware, async (req, res) => {
  try {
    const asanas = await Asana.find().populate("user", "name").sort({ date: -1 });
    res.json(asanas);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Leaderboard
router.get("/leaderboard", authMiddleware, async (req, res) => {
    try {
      const leaderboard = await User.find()
        .select("name asanaCount badges")
        .sort({ asanaCount: -1 })
        .limit(10);
  
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });
  

module.exports = router;
