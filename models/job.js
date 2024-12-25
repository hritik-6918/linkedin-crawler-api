const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  company: String,
  location: String,
  skillsRequired: [String],
  jobDescription: String,
});

module.exports = mongoose.model("Job", jobSchema);
