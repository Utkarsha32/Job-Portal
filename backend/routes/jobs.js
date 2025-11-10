const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "jobportalsecret";

// Middleware to verify token
function auth(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Invalid token" });
        req.userId = decoded.id;
        next();
    });
}

// Get all jobs
router.get("/", auth, async (req, res) => {
  try {
      const jobs = await Job.find().sort({ date: -1 });
      res.json(jobs);
  } catch (err) {
      res.status(500).json({ error: "Failed to fetch jobs" });
  }
});
/*router.get("/", auth, async (req, res) => {
    const jobs = await Job.find().sort({ date: -1 });
    res.json(jobs);
});*/

// Post a job
/*router.post("/post", auth, async (req, res) => {
    const { title, company, location, description } = req.body;
    const job = new Job({ title, company, location, description });
    await job.save();
    res.json({ message: "Job posted successfully" });
});

module.exports = router;*/

router.post("/post", auth, async (req, res) => {
  const { title, company, location, description } = req.body; // <-- include location
  try {
      const job = new Job({ title, company, location, description });
      await job.save();
      res.json({ message: "Job posted successfully" });
  } catch (err) {
      res.status(500).json({ error: "Failed to post job" });
  }
});

module.exports = router;
