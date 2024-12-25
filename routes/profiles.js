const express = require("express");
const Profile = require("../models/profile");
const router = express.Router();

router.get("/", async (req, res) => {
  const { designation, location, company } = req.query;
  const profiles = await Profile.find();

  const matchedProfiles = profiles
    .map((profile) => ({
      ...profile._doc,
      matchScore: calculateMatchScore(
        { designation, location, company },
        profile
      ),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);

  res.json(matchedProfiles);
});

function calculateMatchScore(input, profile) {
  let score = 0;
  if (input.location && profile.location === input.location) score += 30;
  if (input.designation && profile.title.includes(input.designation))
    score += 30;
  if (input.company && profile.currentCompany === input.company) score += 40;
  return score;
}

module.exports = router;
