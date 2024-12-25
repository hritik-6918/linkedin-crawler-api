const express = require("express");
const Job = require("../models/job");
const router = express.Router();

router.get("/", async (req, res) => {
  const { location, designation } = req.query;
  const jobs = await Job.find();

  const matchedJobs = jobs
    .map((job) => ({
      ...job._doc,
      matchScore: calculateMatchScore({ location, designation }, job),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);

  res.json(matchedJobs);
});

function calculateMatchScore(input, job) {
  let score = 0;
  if (input.location && job.location === input.location) score += 30;
  if (input.designation && job.jobTitle.includes(input.designation))
    score += 70;
  return score;
}

module.exports = router;
